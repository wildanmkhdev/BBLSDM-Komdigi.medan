"use client";

import createGlobe, { Arc } from "cobe";
import { useEffect, useRef, useState, useMemo } from "react";
import type { WilayahData } from "@/app/components/WilayahMap";
import { MapPin, Phone, Globe as GlobeIcon, Copy, Check, Navigation, Sparkles, Building2, ExternalLink } from "lucide-react";

interface Globe3DProps {
  wilayahList: WilayahData[];
  selected: WilayahData | null;
  onSelect: (w: WilayahData) => void;
}

interface ProjectedPoint {
  x: number;
  y: number;
  isFront: boolean;
  wilayah: WilayahData;
}

export default function Globe3D({ wilayahList, selected, onSelect }: Globe3DProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  
  const currentPhi = useRef(0);
  const currentTheta = useRef(0.3);
  const isDragging = useRef(false);

  const [projectedPoints, setProjectedPoints] = useState<ProjectedPoint[]>([]);
  const [isCopied, setIsCopied] = useState(false);

  // Convert lat/lng to target phi/theta angles for cobe camera
  const locationToAngles = (lat: number, lng: number) => {
    const phi = (180 - lng) * (Math.PI / 180);
    const theta = lat * (Math.PI / 180);
    return { phi, theta };
  };

  useEffect(() => {
    let width = 0;
    let animId: number;

    const initialLat = selected ? selected.lat : 0.5;
    const initialLng = selected ? selected.lng : 101.5;
    const { phi: initialTargetPhi, theta: initialTargetTheta } = locationToAngles(initialLat, initialLng);

    currentPhi.current = initialTargetPhi;
    currentTheta.current = initialTargetTheta;

    const onResize = () => {
      if (containerRef.current) {
        width = containerRef.current.offsetWidth;
      }
    };
    window.addEventListener("resize", onResize);
    onResize();

    // Glowing connection arcs from Medan HQ (Sumut) to all other regional offices
    const medanHQ: [number, number] = [3.5896, 98.6739];
    const connectionArcs: Arc[] = wilayahList
      .filter((w) => w.provinsi !== "Sumatera Utara")
      .map((w) => ({
        from: medanHQ,
        to: [w.lat, w.lng] as [number, number],
        color: selected?.provinsi === w.provinsi ? [0.22, 0.74, 0.97] : [0.02, 0.4, 0.7],
      }));

    const globe = createGlobe(canvasRef.current!, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: initialTargetPhi,
      theta: initialTargetTheta,
      dark: 1,
      diffuse: 1.5,
      mapSamples: 20000,
      mapBrightness: 8,
      baseColor: [0.04, 0.09, 0.22], // Deep cyber navy (#0b1b3d)
      markerColor: [0.22, 0.74, 0.97], // Web3 Neon Cyan (#38bdf8)
      glowColor: [0.01, 0.52, 0.78], // Neon Blue Glow (#0284c7)
      markers: wilayahList.map((w) => ({
        location: [w.lat, w.lng],
        size: selected?.provinsi === w.provinsi ? 0.09 : 0.045,
      })),
      arcs: connectionArcs,
      arcColor: [0.22, 0.74, 0.97],
      arcWidth: 1.8,
      arcHeight: 0.35,
    });

    // Compute 3D-to-2D screen projection for pins & floating tooltips on the Globe
    const updateProjectedPoints = (phiVal: number, thetaVal: number, containerWidth: number) => {
      const radius = containerWidth * 0.4; // Globe radius in px
      const centerX = containerWidth / 2;
      const centerY = containerWidth / 2;

      const points: ProjectedPoint[] = wilayahList.map((w) => {
        const latRad = w.lat * (Math.PI / 180);
        const lngRad = w.lng * (Math.PI / 180);

        // 3D coordinates on unit sphere
        const x0 = Math.cos(latRad) * Math.sin(lngRad);
        const y0 = Math.sin(latRad);
        const z0 = Math.cos(latRad) * Math.cos(lngRad);

        // Y-axis rotation by phi
        const x1 = x0 * Math.cos(phiVal) + z0 * Math.sin(phiVal);
        const z1 = -x0 * Math.sin(phiVal) + z0 * Math.cos(phiVal);

        // X-axis rotation by theta
        const y2 = y0 * Math.cos(thetaVal) - z1 * Math.sin(thetaVal);
        const z2 = y0 * Math.sin(thetaVal) + z1 * Math.cos(thetaVal);

        const screenX = centerX + x1 * radius;
        const screenY = centerY - y2 * radius;
        const isFront = z2 > 0.05; // Visible on front hemisphere

        return { x: screenX, y: screenY, isFront, wilayah: w };
      });

      setProjectedPoints(points);
    };

    const render = () => {
      if (selected && !isDragging.current) {
        const { phi: targetPhi, theta: targetTheta } = locationToAngles(selected.lat, selected.lng);
        currentPhi.current += (targetPhi - currentPhi.current) * 0.06;
        currentTheta.current += (targetTheta - currentTheta.current) * 0.06;
      } else if (!isDragging.current) {
        currentPhi.current += 0.0025;
      }

      const activePhi = currentPhi.current + pointerInteractionMovement.current;
      const activeTheta = currentTheta.current;

      globe.update({
        phi: activePhi,
        theta: activeTheta,
        width: width * 2,
        height: width * 2,
      });

      if (width > 0) {
        updateProjectedPoints(activePhi, activeTheta, width);
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      globe.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, [wilayahList, selected]);

  /* Handle Copy Address */
  const handleCopyAddress = (alamat: string) => {
    navigator.clipboard.writeText(alamat);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full min-h-[580px] lg:min-h-[720px] bg-[#070e20] flex items-center justify-center overflow-hidden rounded-3xl select-none border border-[#38bdf8]/30 shadow-2xl"
    >
      {/* Background Cyber Matrix Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#0284c7_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />

      {/* Cyber Blue Atmosphere Glow */}
      <div className="absolute w-[450px] h-[450px] sm:w-[600px] sm:h-[600px] rounded-full bg-[#0284c7]/20 blur-[110px] pointer-events-none" />

      {/* 3D WebGL Canvas */}
      <div className="relative w-full aspect-square max-w-[660px] flex items-center justify-center">
        <canvas
          ref={canvasRef}
          onPointerDown={(e) => {
            pointerInteracting.current = e.clientX - pointerInteractionMovement.current;
            isDragging.current = true;
            if (canvasRef.current) canvasRef.current.style.cursor = "grabbing";
          }}
          onPointerUp={() => {
            pointerInteracting.current = null;
            isDragging.current = false;
            if (canvasRef.current) canvasRef.current.style.cursor = "grab";
          }}
          onPointerOut={() => {
            pointerInteracting.current = null;
            isDragging.current = false;
            if (canvasRef.current) canvasRef.current.style.cursor = "grab";
          }}
          onPointerMove={(e) => {
            if (pointerInteracting.current !== null) {
              const delta = e.clientX - pointerInteracting.current;
              pointerInteractionMovement.current = delta * 0.005;
            }
          }}
          className="w-full h-full cursor-grab touch-none opacity-100"
        />

        {/* Projected Interactive Web3 Pin Markers & Address Cards Anchored on Globe */}
        {projectedPoints.map((pt) => {
          if (!pt.isFront) return null;
          const isSelected = selected?.provinsi === pt.wilayah.provinsi;

          return (
            <div
              key={pt.wilayah.provinsi}
              style={{
                position: "absolute",
                left: `${pt.x}px`,
                top: `${pt.y}px`,
                transform: "translate(-50%, -50%)",
              }}
              className="z-30 transition-all duration-150 pointer-events-auto"
            >
              {/* Pulsing Beacon Marker Point */}
              <button
                onClick={() => onSelect(pt.wilayah)}
                className="relative group flex items-center justify-center focus:outline-none"
              >
                {/* Outer animated ring */}
                <span
                  className={`absolute rounded-full transition-all duration-300 ${
                    isSelected
                      ? "w-8 h-8 bg-[#38bdf8]/40 animate-ping"
                      : "w-5 h-5 bg-[#0284c7]/30 group-hover:scale-150"
                  }`}
                />
                {/* Inner solid beacon */}
                <span
                  className={`relative rounded-full border-2 border-white shadow-lg transition-all duration-200 ${
                    isSelected
                      ? "w-4 h-4 bg-[#38bdf8] shadow-[0_0_15px_#38bdf8] scale-125"
                      : "w-3 h-3 bg-[#0284c7] group-hover:bg-[#38bdf8]"
                  }`}
                />

                {/* Mini Badge Tooltip on Hover */}
                {!isSelected && (
                  <span className="absolute left-1/2 -top-8 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-[#0b1b3d]/90 text-white text-[10px] font-bold px-2 py-1 rounded-md border border-[#38bdf8]/40 whitespace-nowrap shadow-md pointer-events-none">
                    {pt.wilayah.provinsi}
                  </span>
                )}
              </button>

              {/* Web3 Floating Interactive Address Card Anchored directly to Selected Marker */}
              {isSelected && (
                <div className="absolute left-1/2 bottom-6 -translate-x-1/2 z-40 w-[280px] sm:w-[320px] bg-[#0b1b3d]/95 backdrop-blur-xl border border-[#38bdf8]/50 rounded-2xl p-4 text-white shadow-[0_10px_35px_rgba(2,132,199,0.4)] animate-in fade-in zoom-in-95 duration-200">
                  {/* Glowing Connection Line */}
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#0b1b3d] border-r border-b border-[#38bdf8]/50 rotate-45" />

                  {/* Header */}
                  <div className="flex items-start justify-between gap-2 mb-2.5">
                    <div>
                      <div className="flex items-center gap-1.5 mb-1">
                        <Sparkles className="w-3.5 h-3.5 text-[#38bdf8] animate-pulse" />
                        <span className="text-[9px] font-mono font-bold tracking-widest text-[#38bdf8] uppercase">
                          WEB3 ACTIVE NODE
                        </span>
                      </div>
                      <h3 className="text-base font-extrabold text-white leading-snug">
                        {pt.wilayah.provinsi}
                      </h3>
                      <p className="text-[11px] text-slate-300 font-medium">
                        Ibu Kota: {pt.wilayah.kota}
                      </p>
                    </div>
                    <div className="w-8 h-8 rounded-xl bg-[#0284c7]/30 border border-[#38bdf8]/40 flex items-center justify-center shrink-0">
                      <Building2 className="w-4 h-4 text-[#38bdf8]" />
                    </div>
                  </div>

                  {/* Address & Phone Details */}
                  <div className="space-y-2 mb-3">
                    <div className="flex items-start gap-2 bg-white/5 p-2 rounded-xl border border-white/10">
                      <MapPin className="w-3.5 h-3.5 text-[#38bdf8] shrink-0 mt-0.5" />
                      <p className="text-[11px] text-slate-200 leading-relaxed">
                        {pt.wilayah.alamat}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 bg-white/5 p-2 rounded-xl border border-white/10">
                      <Phone className="w-3.5 h-3.5 text-[#38bdf8] shrink-0" />
                      <p className="text-[11px] text-slate-200 font-mono">{pt.wilayah.telepon}</p>
                    </div>
                  </div>

                  {/* Interactive Action Buttons */}
                  <div className="grid grid-cols-2 gap-2 mb-2">
                    <button
                      onClick={() => handleCopyAddress(pt.wilayah.alamat)}
                      className={`flex items-center justify-center gap-1 py-1.5 px-2.5 rounded-lg text-[10px] font-bold border transition-all duration-200 ${
                        isCopied
                          ? "bg-emerald-600 border-emerald-500 text-white"
                          : "bg-white/10 hover:bg-white/20 border-white/15 text-slate-200"
                      }`}
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3 h-3 text-white" />
                          <span>Tersalin!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3 text-[#38bdf8]" />
                          <span>Salin Alamat</span>
                        </>
                      )}
                    </button>

                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${pt.wilayah.lat},${pt.wilayah.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1 py-1.5 px-2.5 bg-white/10 hover:bg-white/20 border border-white/15 text-slate-200 rounded-lg text-[10px] font-bold transition-all duration-200"
                    >
                      <Navigation className="w-3 h-3 text-[#38bdf8]" />
                      <span>Rute Maps</span>
                    </a>
                  </div>

                  <a
                    href={pt.wilayah.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 w-full py-2 bg-gradient-to-r from-[#0284c7] to-[#0369a1] hover:from-[#0369a1] hover:to-[#0284c7] text-white text-[11px] font-bold rounded-lg shadow-md transition-all duration-200"
                  >
                    <GlobeIcon className="w-3.5 h-3.5" />
                    <span>Website Diskominfo</span>
                    <ExternalLink className="w-3 h-3 opacity-70" />
                  </a>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Web3 HUD Status Info Bar (Pojok Kiri Bawah) */}
      <div className="absolute bottom-5 left-5 z-20 bg-[#0b1b3d]/90 backdrop-blur-md border border-[#38bdf8]/30 rounded-2xl p-3.5 text-white shadow-2xl max-w-[240px]">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-2.5 h-2.5 rounded-full bg-[#38bdf8] animate-ping" />
          <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#38bdf8]">
            3D WEBGL NODE GLOBE
          </span>
        </div>
        <p className="text-[11px] text-slate-300">
          Klik titik pin di bola dunia untuk melihat kartu alamat interaktif
        </p>
        {selected && (
          <div className="mt-2 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-slate-400">
            <span>LAT: {selected.lat.toFixed(4)}</span>
            <span>LNG: {selected.lng.toFixed(4)}</span>
          </div>
        )}
      </div>
    </div>
  );
}
