import json

geojson_content = open('public/geojson/bblsdm-8-provinsi.geojson', 'r', encoding='utf-8').read()

html_code = f"""<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Peta Wilayah Kerja — BBLSDM Komdigi Medan</title>
  <meta name="description" content="Peta interaktif wilayah kerja BBLSDM Komdigi Medan — 8 provinsi Sumatera dengan GeoJSON akurat." />

  <!-- Leaflet CSS -->
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />

  <!-- Google Fonts -->
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />

  <!-- Tailwind CDN (JIT) -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {{
      theme: {{
        extend: {{
          fontFamily: {{ sans: ['Inter','system-ui','sans-serif'] }},
          colors: {{
            navy: {{
              DEFAULT : '#0b1b3d',
              mid     : '#0f2147',
              light   : '#1a3260',
              border  : '#1e3a6e',
            }},
            brand: {{
              DEFAULT : '#0284c7',
              dark    : '#0369a1',
              sky     : '#0ea5e9',
              light   : '#38bdf8',
              pale    : '#bae6fd',
            }}
          }}
        }}
      }}
    }}
  </script>

  <style>
    html,body {{ height:100%; overflow:hidden; }}
    #map      {{ height:100%; width:100%; }}

    /* Tile grayscale */
    .tile-gray  {{ filter:grayscale(100%) brightness(1.07); transition:filter .45s ease; }}
    .tile-color {{ filter:none;                             transition:filter .45s ease; }}

    /* Leaflet popup customization */
    .leaflet-popup-content-wrapper {{
      border-radius:14px !important;
      box-shadow:0 8px 32px rgba(0,0,0,.18) !important;
      border:1px solid #e2e8f0;
      padding:0 !important; overflow:hidden;
    }}
    .leaflet-popup-content {{ margin:0 !important; min-width:155px; }}
    .leaflet-popup-tip     {{ background:#fff; }}
    .leaflet-popup-close-button {{ top:8px !important; right:8px !important; color:#94a3b8 !important; }}

    /* Sidebar scrollbar */
    #province-list::-webkit-scrollbar       {{ width:4px; }}
    #province-list::-webkit-scrollbar-track {{ background:transparent; }}
    #province-list::-webkit-scrollbar-thumb {{ background:#1e3a6e; border-radius:4px; }}

    /* Marker keyframes */
    @keyframes mp-active {{ 0%{{transform:scale(.5);opacity:1}}  100%{{transform:scale(2.1);opacity:0}} }}
    @keyframes mp-soft   {{ 0%{{transform:scale(.6);opacity:.8}} 100%{{transform:scale(1.9);opacity:0}} }}
    @keyframes blink     {{ 0%,100%{{opacity:1;transform:scale(1)}} 50%{{opacity:.45;transform:scale(1.4)}} }}
  </style>
</head>

<body class="font-sans bg-slate-100 flex flex-col">

  <!-- HEADER -->
  <header class="sticky top-0 z-50 flex-shrink-0 h-14 bg-navy border-b border-navy-border flex items-center justify-between px-5 gap-4">
    <div class="flex items-center gap-3 flex-shrink-0">
      <div class="w-9 h-9 rounded-xl bg-brand flex items-center justify-center">
        <svg class="w-[18px] h-[18px] text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
        </svg>
      </div>
      <div>
        <p class="text-white font-extrabold text-[13px] tracking-tight leading-tight">BBLSDM KOMDIGI</p>
        <p class="text-slate-500 text-[10px] font-medium mt-px">Balai Besar Layanan SDM Digital · Medan</p>
      </div>
    </div>

    <nav class="hidden md:flex items-center gap-0.5">
      <a href="#" class="px-4 py-2 rounded-lg text-xs font-semibold text-slate-400 hover:text-white hover:bg-white/5 transition-colors">Beranda</a>
      <a href="#" class="px-4 py-2 rounded-lg text-xs font-semibold text-slate-400 hover:text-white hover:bg-white/5 transition-colors">Profil</a>
      <a href="#" class="px-4 py-2 rounded-lg text-xs font-semibold text-brand-light bg-brand/10 border border-brand/20">Wilayah Kerja</a>
      <a href="#" class="px-4 py-2 rounded-lg text-xs font-semibold text-slate-400 hover:text-white hover:bg-white/5 transition-colors">Informasi</a>
      <a href="#" class="px-4 py-2 rounded-lg text-xs font-semibold text-slate-400 hover:text-white hover:bg-white/5 transition-colors">Layanan</a>
    </nav>

    <button class="flex-shrink-0 flex items-center gap-2 px-4 py-[7px] rounded-lg border border-navy-border text-slate-400 text-xs font-semibold hover:border-brand/40 hover:text-white transition-all">
      <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0zM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
      Masuk
    </button>
  </header>

  <!-- MAIN CONTENT -->
  <main class="flex flex-1 overflow-hidden min-h-0">

    <!-- MAP PANEL (LEFT) -->
    <div class="relative flex-1 min-w-0">
      <div id="map"></div>

      <!-- Info Badge (Top Left) -->
      <div class="absolute top-3 left-3 z-20 bg-white/95 backdrop-blur-md border border-slate-200 rounded-xl px-3.5 py-2.5 shadow-lg max-w-[260px]">
        <div class="flex items-center gap-1.5 mb-[3px]">
          <span id="badge-dot" class="w-[7px] h-[7px] rounded-full bg-brand-light flex-shrink-0 hidden" style="animation:blink 2s ease-in-out infinite;"></span>
          <span id="badge-label" class="text-[9px] font-bold text-brand uppercase tracking-[0.18em]">Peta GeoJSON Presisi</span>
        </div>
        <p id="badge-text" class="text-[11px] text-slate-500 font-medium leading-snug">
          Batas daratan &amp; pulau akurat sesuai data GeoJSON
        </p>
      </div>

      <!-- Reset Button (Top Right) -->
      <button id="reset-btn" onclick="handleReset()"
        class="absolute top-3 right-3 z-20 bg-white/95 backdrop-blur-md border border-slate-200 rounded-xl px-3.5 py-2.5 shadow-lg
               text-[11px] font-semibold text-slate-500 hover:text-brand transition-colors hidden items-center gap-2">
        <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12H9" />
        </svg>
        Reset Peta
      </button>

      <!-- Regional Banner Bottom -->
      <div id="regional-bar"
        class="absolute bottom-4 left-1/2 -translate-x-1/2 z-20
               bg-navy/90 backdrop-blur-md border border-brand/30 text-white
               rounded-full px-5 py-2 text-[10px] font-bold tracking-widest uppercase
               shadow-xl items-center gap-2.5 hidden">
        <span class="w-2 h-2 rounded-full bg-brand-light flex-shrink-0" style="animation:blink 2s ease-in-out infinite;"></span>
        Wilayah Kerja — Regional Sumatera (GeoJSON Akurat)
      </div>
    </div>

    <!-- SIDEBAR (RIGHT) -->
    <aside class="w-[300px] flex-shrink-0 bg-navy border-l border-navy-border flex flex-col overflow-hidden">
      <div class="px-5 py-4 border-b border-navy-border flex-shrink-0">
        <p class="text-[9px] font-bold text-brand-light tracking-[0.22em] uppercase mb-1">Dashboard Peta</p>
        <h1 class="text-[13px] font-extrabold text-white leading-tight">Wilayah Kerja BBLSDM</h1>
      </div>

      <div class="flex-shrink-0 border-b border-navy-border">
        <!-- Default State -->
        <div id="card-default" class="px-5 py-4">
          <button onclick="handleRegionalView()"
            class="w-full flex items-center gap-3 bg-brand/10 border border-brand/25 hover:bg-brand/20 hover:border-brand/50
                   rounded-xl px-4 py-3.5 text-left transition-all group mb-3">
            <div class="w-9 h-9 rounded-lg bg-brand/20 group-hover:bg-brand/30 flex items-center justify-center flex-shrink-0 transition-colors">
              <svg class="w-[17px] h-[17px] text-brand-light" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M6.429 9.75 2.25 12l4.179 2.25m0-4.5 5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0 4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0-5.571 3-5.571-3" />
              </svg>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-xs font-bold text-white group-hover:text-brand-light transition-colors leading-tight mb-px">Tampilkan Semua Regional</p>
              <p class="text-[10px] text-slate-500">8 provinsi wilayah kerja Sumatera</p>
            </div>
            <svg class="w-4 h-4 text-slate-600 group-hover:text-brand-light transition-colors flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="m9 5 7 7-7 7" />
            </svg>
          </button>
          <p class="text-[10px] text-slate-600 text-center">— atau pilih provinsi dari daftar di bawah —</p>
        </div>

        <!-- Province Active Card -->
        <div id="card-province" class="px-5 py-4 hidden">
          <p class="text-[9px] font-bold text-brand-light tracking-[0.2em] uppercase mb-3">Provinsi Terpilih</p>

          <div class="flex items-start gap-3 mb-4">
            <div class="w-10 h-10 rounded-full bg-brand flex items-center justify-center flex-shrink-0 shadow-lg shadow-brand/30">
              <svg class="w-[18px] h-[18px] text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 0 1 15 0z" />
              </svg>
            </div>
            <div class="flex-1 min-w-0">
              <h2 class="text-[15px] font-extrabold text-white leading-tight truncate" id="d-name">—</h2>
              <p class="text-xs text-slate-400 mt-px" id="d-city">—</p>
            </div>
          </div>

          <div class="space-y-2.5 mb-4">
            <div class="flex items-start gap-2.5">
              <svg class="w-3.5 h-3.5 text-brand-light flex-shrink-0 mt-[1px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 0 1 15 0z" />
              </svg>
              <p class="text-[11px] text-slate-300 leading-relaxed" id="d-alamat">—</p>
            </div>
            <div class="flex items-center gap-2.5">
              <svg class="w-3.5 h-3.5 text-brand-light flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25z" />
              </svg>
              <p class="text-[11px] text-slate-300" id="d-telepon">—</p>
            </div>
          </div>

          <div class="flex flex-col gap-2">
            <a id="d-website" href="#" target="_blank" rel="noopener noreferrer"
              class="flex items-center justify-center gap-2 py-[9px] bg-brand hover:bg-brand-dark text-white text-[11px] font-bold rounded-lg transition-colors">
              <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253" />
              </svg>
              Kunjungi Website Resmi
            </a>
            <a id="d-maps" href="#" target="_blank" rel="noopener noreferrer"
              class="flex items-center justify-center gap-2 py-[9px] bg-white/[0.07] border border-white/10 hover:bg-white/[0.13] text-white text-[11px] font-bold rounded-lg transition-colors">
              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
              Buka di Google Maps
            </a>
          </div>
        </div>

        <!-- Regional Summary Card -->
        <div id="card-regional" class="px-5 py-4 hidden">
          <p class="text-[9px] font-bold text-brand-light tracking-[0.2em] uppercase mb-3">Ringkasan Regional</p>
          <div class="grid grid-cols-3 gap-2 mb-3">
            <div class="bg-brand/10 border border-brand/20 rounded-xl p-2 text-center">
              <p class="text-xl font-black text-white">8</p>
              <p class="text-[9px] text-slate-500 font-semibold mt-px">Provinsi</p>
            </div>
            <div class="bg-brand/10 border border-brand/20 rounded-xl p-2 text-center">
              <p class="text-xl font-black text-white">3</p>
              <p class="text-[9px] text-slate-500 font-semibold mt-px">Kepulauan</p>
            </div>
            <div class="bg-brand/10 border border-brand/20 rounded-xl p-2 text-center">
              <p class="text-xl font-black text-white">1</p>
              <p class="text-[9px] text-slate-500 font-semibold mt-px">Regional</p>
            </div>
          </div>
          <p class="text-[10px] text-slate-400 leading-relaxed mb-2">
            Mengelola pengembangan SDM digital di <strong class="text-white">8 provinsi</strong> wilayah Sumatera dengan batas GeoJSON daratan yang presisi.
          </p>
        </div>
      </div>

      <div id="province-list" class="flex-1 overflow-y-auto min-h-0">
        <div class="px-5 py-2.5 sticky top-0 bg-navy border-b border-navy-border z-10">
          <p class="text-[9px] font-bold text-slate-500 uppercase tracking-[0.18em]">
            Semua Wilayah Kerja — 8 Provinsi
          </p>
        </div>
      </div>

    </aside>
  </main>

  <footer class="flex-shrink-0 h-8 bg-slate-50 border-t border-slate-200 px-5 flex items-center gap-2">
    <span class="w-1.5 h-1.5 rounded-full bg-brand flex-shrink-0"></span>
    <p class="text-[10px] text-slate-400">
      Data GeoJSON Asli Batas Provinsi &bull; Peta: &copy; OpenStreetMap contributors
    </p>
  </footer>

  <!-- Leaflet JS -->
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>

  <script>
  /* ACCURATE GEOJSON DATA FOR 8 PROVINCES */
  const BBLSDM_GEOJSON = {geojson_content};

  const PROVINCES = [
    {{
      id: 'aceh',
      stateName: 'Aceh',
      name: 'Aceh',
      city: 'Banda Aceh',
      alamat: 'Jl. T. Panglima Nyak Makam No. 8 Lampineng, Kota Banda Aceh',
      telepon: '(0651) 7552564',
      website: 'https://diskominfo.acehprov.go.id/',
      lat: 5.5659, lng: 95.3432
    }},
    {{
      id: 'sumut',
      stateName: 'Sumatera Utara',
      name: 'Sumatera Utara',
      city: 'Medan',
      alamat: 'Jl. Ngalengko No. 1, Perintis, Kec. Medan Timur, Kota Medan 20236',
      telepon: '(6261) 4525438',
      website: 'https://diskominfo.sumutprov.go.id/',
      lat: 3.6009, lng: 98.6884
    }},
    {{
      id: 'sumbar',
      stateName: 'Sumatera Barat',
      name: 'Sumatera Barat',
      city: 'Padang',
      alamat: 'Jl. Raya Indarung Km. 12, Padang Besi, Kota Padang',
      telepon: '—',
      website: 'https://diskominfo.sumbarprov.go.id/',
      lat: -0.9524, lng: 100.4746
    }},
    {{
      id: 'riau',
      stateName: 'Riau',
      name: 'Riau',
      city: 'Pekanbaru',
      alamat: 'Jl. Ronggowarsito No. 14, Kota Pekanbaru, Provinsi Riau',
      telepon: '(0761) 28997',
      website: 'https://diskominfotik.riau.go.id/',
      lat: 0.5133, lng: 101.4549
    }},
    {{
      id: 'kepri',
      stateName: 'Kepulauan Riau',
      name: 'Kepulauan Riau',
      city: 'Tanjung Pinang',
      alamat: 'Pusat Pemerintahan Kepri, Gedung Sultan Mahmud Riayat Syah, Dompak, Tanjung Pinang',
      telepon: '—',
      website: 'https://diskominfo.kepriprov.go.id/',
      lat: 0.8779, lng: 104.4451
    }},
    {{
      id: 'jambi',
      stateName: 'Jambi',
      name: 'Jambi',
      city: 'Jambi',
      alamat: 'Jl. H. Agus Salim, Paal Lima, Kec. Kota Baru, Kota Jambi 36129',
      telepon: '—',
      website: 'https://diskominfo.jambiprov.go.id/',
      lat: -1.6325, lng: 103.6110
    }},
    {{
      id: 'sumsel',
      stateName: 'Sumatera Selatan',
      name: 'Sumatera Selatan',
      city: 'Palembang',
      alamat: 'Jl. Kapten A. Rivai No. 23, 19 Ilir, Kec. Bukit Kecil, Kota Palembang',
      telepon: '—',
      website: 'https://diskominfo.sumselprov.go.id/',
      lat: -2.9909, lng: 104.7564
    }},
    {{
      id: 'babel',
      stateName: 'Bangka-Belitung',
      name: 'Bangka Belitung',
      city: 'Pangkal Pinang',
      alamat: 'Jl. Pulau Bangka, Air Itam, Pangkalpinang 33148',
      telepon: '(0717) 439-426',
      website: 'https://diskominfo.babelprov.go.id/',
      lat: -2.1615, lng: 106.1681
    }}
  ];

  let viewMode = 'default';
  let selectedId = null;
  const geoJsonLayers = {{}};
  const markerMap = {{}};

  const map = L.map('map', {{ center: [-2.5, 118.0], zoom: 4, zoomControl: true }});

  L.tileLayer('https://{{s}}.tile.openstreetmap.org/{{z}}/{{x}}/{{y}}.png', {{
    attribution: '&copy; OpenStreetMap contributors',
    maxZoom: 19,
  }}).addTo(map);

  function setTileGrayscale(on) {{
    const tp = map.getPanes().tilePane;
    tp.style.transition = 'filter .45s ease';
    tp.style.filter = on ? 'grayscale(100%) brightness(1.07)' : 'none';
  }}
  setTimeout(() => setTileGrayscale(true), 120);

  /* GeoJSON styling function: precise blue fill for landmass with perfect translucency */
  function getFeatureStyle(stateName, mode, activeId) {{
    const p = PROVINCES.find(x => x.stateName === stateName || x.name === stateName);
    const isThisActive = mode === 'province' && p && p.id === activeId;

    if (isThisActive) {{
      return {{
        color: '#0284c7',       // Border line color (vibrant blue)
        weight: 2.5,            // Clean border line weight
        opacity: 0.95,
        fillColor: '#0284c7',    // Precise blue landmass fill
        fillOpacity: 0.55       // Translucent so underlying map details are clearly visible
      }};
    }} else if (mode === 'regional') {{
      return {{
        color: '#0284c7',
        weight: 1.5,
        opacity: 0.7,
        fillColor: '#0ea5e9',
        fillOpacity: 0.20
      }};
    }} else {{
      return {{
        color: 'transparent',
        weight: 0,
        opacity: 0,
        fillColor: 'transparent',
        fillOpacity: 0
      }};
    }}
  }}

  /* Marker icon factory */
  function makeMarkerIcon(state) {{
    const size = state === 'active' ? 20 : state === 'regional' ? 14 : 10;
    const color = state !== 'idle' ? '#0284c7' : '#64748b';
    const ring = state === 'active' 
      ? `<div style="position:absolute;inset:0;border-radius:50%;background:rgba(2,132,199,.35);animation:mp-active 1.6s ease-out infinite;"></div>`
      : '';

    return L.divIcon({{
      className: '',
      iconSize: [32, 32],
      iconAnchor: [16, 16],
      html: `<div style="position:relative;width:32px;height:32px;display:flex;align-items:center;justify-content:center;">
               ${{ring}}
               <div style="width:${{size}}px;height:${{size}}px;background:${{color}};border:2px solid #fff;border-radius:50%;box-shadow:0 0 12px rgba(2,132,199,.8);"></div>
             </div>`
    }});
  }}

  /* Render GeoJSON Layer */
  const geoLayer = L.geoJSON(BBLSDM_GEOJSON, {{
    style: function(feature) {{
      return getFeatureStyle(feature.properties.state, 'default', null);
    }},
    onEachFeature: function(feature, layer) {{
      const stateName = feature.properties.state;
      const p = PROVINCES.find(x => x.stateName === stateName || x.name === stateName);
      if (p) {{
        geoJsonLayers[p.id] = layer;
        layer.on('click', function() {{ selectProvince(p.id); }});
        layer.on('mouseover', function() {{
          if (viewMode !== 'province' || selectedId !== p.id) {{
            layer.setStyle({{ fillOpacity: 0.35, fillColor: '#0ea5e9', color: '#0284c7', weight: 2 }});
          }}
        }});
        layer.on('mouseout', function() {{
          refreshLayerStyles();
        }});
      }}
    }}
  }}).addTo(map);

  /* Add Markers */
  PROVINCES.forEach(p => {{
    const marker = L.marker([p.lat, p.lng], {{ icon: makeMarkerIcon('idle') }}).addTo(map);
    marker.on('click', () => selectProvince(p.id));
    markerMap[p.id] = marker;
  }});

  /* Build Sidebar List */
  const listEl = document.getElementById('province-list');
  PROVINCES.forEach(p => {{
    const el = document.createElement('div');
    el.id = `item-${{p.id}}`;
    el.className = 'flex items-center gap-3 px-5 py-[13px] border-b border-navy-border cursor-pointer transition-all hover:bg-white/[0.04]';
    el.innerHTML = `
      <span id="dot-${{p.id}}" class="w-2 h-2 rounded-full bg-slate-700"></span>
      <div class="flex-1 min-w-0">
        <p id="name-${{p.id}}" class="text-[13px] font-semibold text-slate-400 truncate">${{p.name}}</p>
        <p class="text-[10px] text-slate-600">${{p.city}}</p>
      </div>
    `;
    el.addEventListener('click', () => selectProvince(p.id));
    listEl.appendChild(el);
  }});

  function refreshLayerStyles() {{
    geoLayer.eachLayer(function(layer) {{
      const stateName = layer.feature.properties.state;
      layer.setStyle(getFeatureStyle(stateName, viewMode, selectedId));
    }});
  }}

  function setMode(mode, id = null) {{
    viewMode = mode;
    selectedId = id;

    refreshLayerStyles();

    PROVINCES.forEach(p => {{
      const isActive = mode === 'province' && p.id === id;
      const isRegional = mode === 'regional';

      markerMap[p.id].setIcon(makeMarkerIcon(isActive ? 'active' : isRegional ? 'regional' : 'idle'));

      const itemEl = document.getElementById(`item-${{p.id}}`);
      const nameEl = document.getElementById(`name-${{p.id}}`);
      itemEl.style.background = (isActive || isRegional) ? 'rgba(2,132,199,.12)' : '';
      nameEl.style.color = (isActive || isRegional) ? '#ffffff' : '#94a3b8';
    }});

    setTileGrayscale(mode === 'default');

    document.getElementById('reset-btn').classList.toggle('hidden', mode === 'default');
    document.getElementById('reset-btn').classList.toggle('flex', mode !== 'default');
    document.getElementById('regional-bar').classList.toggle('hidden', mode !== 'regional');
    document.getElementById('regional-bar').classList.toggle('flex', mode === 'regional');

    show('card-default', mode === 'default');
    show('card-province', mode === 'province');
    show('card-regional', mode === 'regional');

    if (mode === 'province' && id) {{
      const p = PROVINCES.find(x => x.id === id);
      document.getElementById('d-name').textContent = p.name;
      document.getElementById('d-city').textContent = p.city;
      document.getElementById('d-alamat').textContent = p.alamat;
      document.getElementById('d-telepon').textContent = p.telepon;
      document.getElementById('d-website').href = p.website;
      document.getElementById('d-maps').href = `https://www.google.com/maps/search/?api=1&query=${{p.lat}},${{p.lng}}`;
    }}
  }}

  function show(id, visible) {{
    document.getElementById(id).classList.toggle('hidden', !visible);
  }}

  function selectProvince(id) {{
    setMode('province', id);
    const layer = geoJsonLayers[id];
    if (layer) {{
      const bounds = layer.getBounds();
      map.flyToBounds(bounds, {{ padding: [48, 48], duration: 1.1, maxZoom: 10 }});
    }}
  }}

  function handleRegionalView() {{
    setMode('regional');
    const bounds = geoLayer.getBounds();
    map.flyToBounds(bounds, {{ padding: [36, 36], duration: 1.25, maxZoom: 7 }});
  }}

  function handleReset() {{
    setMode('default');
    map.flyTo([-2.5, 118.0], 4, {{ duration: 1.0 }});
  }}

  setMode('default');
  </script>
</body>
</html>"""

open('public/peta-wilayah-kerja.html', 'w', encoding='utf-8').write(html_code)
print('Updated public/peta-wilayah-kerja.html successfully with GeoJSON!')
