"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

/* ─── Province coordinate data ─── */
export interface WilayahData {
  provinsi: string;
  kota: string;
  alamat: string;
  telepon: string;
  website: string;
  lat: number;
  lng: number;
  zone?: string;
}

/* ─── Fly to selected marker ─── */
function FlyTo({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo([lat, lng], 8, { duration: 1.2 });
  }, [lat, lng, map]);
  return null;
}

/* ─── Custom marker icon with animated pulsing beacon ─── */
function createCustomIcon(isActive: boolean) {
  return L.divIcon({
    className: "custom-leaflet-marker",
    html: `
      <div style="position: relative; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center;">
        ${
          isActive
            ? `<div style="
                position: absolute;
                width: 32px;
                height: 32px;
                background: rgba(2, 132, 199, 0.35);
                border-radius: 50%;
                animation: map-pulse 1.6s ease-out infinite;
              "></div>`
            : ""
        }
        <div style="
          position: relative;
          z-index: 10;
          width: ${isActive ? "18px" : "12px"};
          height: ${isActive ? "18px" : "12px"};
          background: ${isActive ? "#0284c7" : "#0b1b3d"};
          border: ${isActive ? "3px solid #ffffff" : "2px solid #ffffff"};
          border-radius: 50%;
          box-shadow: ${isActive ? "0 0 12px rgba(2, 132, 199, 0.8)" : "0 2px 6px rgba(0,0,0,0.3)"};
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        "></div>
      </div>
      <style>
        @keyframes map-pulse {
          0% { transform: scale(0.5); opacity: 1; }
          100% { transform: scale(1.6); opacity: 0; }
        }
      </style>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });
}

interface WilayahMapProps {
  wilayahList: WilayahData[];
  selected: WilayahData | null;
  onSelect: (w: WilayahData) => void;
}

export default function WilayahMap({ wilayahList, selected, onSelect }: WilayahMapProps) {
  // Center of Sumatra region
  const center: [number, number] = [0.5, 101.5];

  return (
    <MapContainer
      center={center}
      zoom={5}
      style={{ height: "100%", width: "100%", minHeight: "420px" }}
      className="rounded-none z-0"
      zoomControl={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Fly to selected location */}
      {selected && <FlyTo lat={selected.lat} lng={selected.lng} />}

      {/* Markers */}
      {wilayahList.map((w) => {
        const isActive = selected?.provinsi === w.provinsi;
        return (
          <Marker
            key={w.provinsi}
            position={[w.lat, w.lng]}
            icon={createCustomIcon(isActive)}
            eventHandlers={{ click: () => onSelect(w) }}
          >
            <Popup className="custom-popup">
              <div className="p-1 text-slate-800">
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
