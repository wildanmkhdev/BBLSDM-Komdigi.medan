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
}

/* ─── Fly to selected marker ─── */
function FlyTo({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo([lat, lng], 8, { duration: 1.2 });
  }, [lat, lng, map]);
  return null;
}

/* ─── Custom blue circle marker ─── */
function createCustomIcon(isActive: boolean) {
  return L.divIcon({
    className: "",
    html: `
      <div style="
        width: ${isActive ? 20 : 14}px;
        height: ${isActive ? 20 : 14}px;
        background: ${isActive ? "#0b1b3d" : "#0284c7"};
        border: ${isActive ? 3 : 2}px solid white;
        border-radius: 50%;
        box-shadow: 0 2px 8px rgba(2,132,199,0.5);
        transition: all 0.2s;
      "></div>
    `,
    iconSize: [isActive ? 20 : 14, isActive ? 20 : 14],
    iconAnchor: [isActive ? 10 : 7, isActive ? 10 : 7],
  });
}

interface WilayahMapProps {
  wilayahList: WilayahData[];
  selected: WilayahData | null;
  onSelect: (w: WilayahData) => void;
}

export default function WilayahMap({ wilayahList, selected, onSelect }: WilayahMapProps) {
  // Center of Sumatra
  const center: [number, number] = [0.5, 101.5];

  return (
    <MapContainer
      center={center}
      zoom={5}
      style={{ height: "100%", width: "100%", minHeight: "420px" }}
      className="rounded-none"
      zoomControl={true}
    >
      {/* OpenStreetMap tiles — free, no API key */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Fly to selected */}
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
            <Popup>
              <div style={{ minWidth: "160px" }}>
                <p style={{ fontWeight: 700, fontSize: "13px", color: "#0b1b3d", marginBottom: "4px" }}>
                  {w.provinsi}
                </p>
                <p style={{ fontSize: "11px", color: "#64748b" }}>{w.kota}</p>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
