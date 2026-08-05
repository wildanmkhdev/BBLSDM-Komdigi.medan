"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { MapContainer, TileLayer, Marker, Popup, GeoJSON, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

export interface WilayahData {
  provinsi: string;
  kota: string;
  alamat: string;
  telepon: string;
  website: string;
  lat: number;
  lng: number;
  zone?: string;
  stateName?: string;
}

export type WilayahViewMode = "default" | "regional" | "province";

const STATE_MAP: Record<string, string> = {
  "Aceh": "Aceh",
  "Sumatera Utara": "Sumatera Utara",
  "Sumatera Barat": "Sumatera Barat",
  "Riau": "Riau",
  "Kepulauan Riau": "Kepulauan Riau",
  "Jambi": "Jambi",
  "Sumatera Selatan": "Sumatera Selatan",
  "Bangka Belitung": "Bangka-Belitung",
};

/* ─── Map view controller ─── */
function MapViewController({
  viewMode,
  selected,
  geoJsonRef,
}: {
  viewMode: WilayahViewMode;
  selected: WilayahData | null;
  geoJsonRef: React.RefObject<any>;
}) {
  const map = useMap();

  useEffect(() => {
    if (viewMode === "default") {
      // Full Indonesia view
      map.flyTo([-2.5, 118.0], 4.5, { duration: 1.0 });
    } else if (viewMode === "regional") {
      if (geoJsonRef.current) {
        try {
          const bounds = geoJsonRef.current.getBounds();
          if (bounds.isValid()) {
            map.flyToBounds(bounds, { padding: [36, 36], duration: 1.25 });
            return;
          }
        } catch (e) {}
      }
      map.flyToBounds([[5.9, 95.1], [-3.5, 108.5]], { padding: [36, 36], duration: 1.25 });
    } else if (viewMode === "province" && selected) {
      const targetState = STATE_MAP[selected.provinsi] || selected.provinsi;
      let matchedLayer: any = null;

      if (geoJsonRef.current) {
        geoJsonRef.current.eachLayer((layer: any) => {
          const st = layer.feature?.properties?.state;
          if (st === targetState || st === selected.provinsi) {
            matchedLayer = layer;
          }
        });
      }

      if (matchedLayer) {
        const bounds = matchedLayer.getBounds();
        map.flyToBounds(bounds, { padding: [48, 48], duration: 1.1, maxZoom: 10 });
      } else {
        map.flyTo([selected.lat, selected.lng], 9, { duration: 1.0 });
      }
    }
  }, [viewMode, selected, map, geoJsonRef]);

  return null;
}

/* ─── Custom marker icon factory ─── */
function createCustomIcon(isActive: boolean, isRegional: boolean) {
  const color = isActive || isRegional ? "#0284c7" : "#64748b";
  const size = isActive ? 20 : isRegional ? 14 : 11;
  const border = isActive ? "3px solid #ffffff" : isRegional ? "2px solid rgba(255,255,255,0.9)" : "2px solid #ffffff";
  const glow = isActive
    ? "0 0 16px rgba(2,132,199,0.9)"
    : isRegional
    ? "0 0 8px rgba(2,132,199,0.5)"
    : "0 2px 6px rgba(0,0,0,0.25)";

  return L.divIcon({
    className: "custom-leaflet-marker",
    html: `
      <div style="position:relative;width:32px;height:32px;display:flex;align-items:center;justify-content:center;">
        ${
          isActive
            ? `<div style="position:absolute;width:32px;height:32px;background:rgba(2,132,199,0.35);border-radius:50%;animation:map-pulse 1.6s ease-out infinite;"></div>`
            : isRegional
            ? `<div style="position:absolute;width:24px;height:24px;background:rgba(2,132,199,0.2);border-radius:50%;animation:map-pulse-soft 2s ease-out infinite;"></div>`
            : ""
        }
        <div style="position:relative;z-index:10;width:${size}px;height:${size}px;background:${color};border:${border};border-radius:50%;box-shadow:${glow};transition:all 0.25s cubic-bezier(0.4,0,0.2,1);"></div>
      </div>
      <style>
        @keyframes map-pulse{0%{transform:scale(0.5);opacity:1;}100%{transform:scale(2.1);opacity:0;}}
        @keyframes map-pulse-soft{0%{transform:scale(0.6);opacity:0.8;}100%{transform:scale(1.8);opacity:0;}}
      </style>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });
}

interface WilayahMapProps {
  wilayahList: WilayahData[];
  selected: WilayahData | null;
  viewMode: WilayahViewMode;
  onSelect: (w: WilayahData) => void;
}

export default function WilayahMap({
  wilayahList,
  selected,
  viewMode,
  onSelect,
}: WilayahMapProps) {
  const INDONESIA_CENTER: [number, number] = [-2.5, 118.0];
  const INDONESIA_ZOOM = 4.5;
  const [geoJsonData, setGeoJsonData] = useState<any>(null);
  const geoJsonRef = useRef<any>(null);

  // Inject CSS once on mount (cannot use <style> tag inside MapContainer)
  useEffect(() => {
    const id = "wilayah-map-styles";
    if (!document.getElementById(id)) {
      const style = document.createElement("style");
      style.id = id;
      style.textContent = `
        .grayscale-tile { filter: grayscale(100%) brightness(1.05); }
        .leaflet-container { background: #e8ecf0; }
      `;
      document.head.appendChild(style);
    }
  }, []);

  // Fetch GeoJSON on mount
  useEffect(() => {
    fetch("/geojson/bblsdm-8-provinsi.geojson")
      .then((res) => res.json())
      .then((data) => setGeoJsonData(data))
      .catch((err) => console.error("Failed to load GeoJSON:", err));
  }, []);

  // Dynamic GeoJSON styling function
  const getStyle = (feature: any) => {
    const st = feature?.properties?.state;
    const targetState = selected ? STATE_MAP[selected.provinsi] || selected.provinsi : null;
    const isThisActive = viewMode === "province" && (st === targetState || st === selected?.provinsi);

    if (isThisActive) {
      return {
        color: "#0284c7",       // Vibrant blue border
        weight: 2.5,
        opacity: 0.95,
        fillColor: "#0284c7",    // Precise blue landmass fill
        fillOpacity: 0.55,      // Translucent opacity so map details stay visible
      };
    } else if (viewMode === "regional") {
      return {
        color: "#0284c7",
        weight: 1.5,
        opacity: 0.7,
        fillColor: "#0ea5e9",
        fillOpacity: 0.20,
      };
    } else {
      return {
        color: "transparent",
        weight: 0,
        opacity: 0,
        fillColor: "transparent",
        fillOpacity: 0,
      };
    }
  };

  const onEachFeature = (feature: any, layer: any) => {
    const st = feature?.properties?.state;
    const matchedProv = wilayahList.find(
      (w) => w.provinsi === st || STATE_MAP[w.provinsi] === st
    );

    if (matchedProv) {
      layer.on({
        click: () => onSelect(matchedProv),
        mouseover: () => {
          if (viewMode !== "province" || selected?.provinsi !== matchedProv.provinsi) {
            layer.setStyle({
              fillOpacity: 0.35,
              fillColor: "#0ea5e9",
              color: "#0284c7",
              weight: 2,
            });
          }
        },
      });
    }
  };

  return (
    <MapContainer
      center={INDONESIA_CENTER}
      zoom={INDONESIA_ZOOM}
      minZoom={3}
      maxZoom={13}
      style={{ height: "100%", width: "100%", minHeight: "420px" }}
      className="rounded-none z-0"
      zoomControl={true}
    >
      {/* Tile layer — grayscale when default, normal otherwise */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* View controller */}
      <MapViewController viewMode={viewMode} selected={selected} geoJsonRef={geoJsonRef} />

      {/* Render GeoJSON boundary layer */}
      {geoJsonData && (
        <GeoJSON
          key={`geojson-${viewMode}-${selected?.provinsi || "none"}`}
          ref={geoJsonRef}
          data={geoJsonData}
          style={getStyle}
          onEachFeature={onEachFeature}
        />
      )}

      {/* Markers */}
      {wilayahList.map((w) => {
        const isActive = viewMode === "province" && selected?.provinsi === w.provinsi;
        const isRegional = viewMode === "regional";
        return (
          <Marker
            key={w.provinsi}
            position={[w.lat, w.lng]}
            icon={createCustomIcon(isActive, isRegional)}
            eventHandlers={{ click: () => onSelect(w) }}
          >
            <Popup className="custom-popup">
              <div className="p-1 text-slate-800 font-sans">
                <p className="font-bold text-xs text-[#0b1b3d] mb-0.5">{w.provinsi}</p>
                <p className="text-[11px] text-slate-500 font-medium">{w.kota}</p>
                <div className="mt-2 pt-1.5 border-t border-slate-100 flex items-center justify-between gap-2">
                  <span className="text-[10px] text-[#0284c7] font-semibold">Klik untuk detail</span>
                  <span className="text-[10px] text-slate-400">→</span>
                </div>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}


