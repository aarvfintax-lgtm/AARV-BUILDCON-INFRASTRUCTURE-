import React, { useState } from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  showText?: boolean;
  className?: string;
  is3dHoverable?: boolean;
}

/**
 * High-Precision 3D Corporate Structure Vector Emblem
 * Represents:
 * 1. Monolithic 3D Architectural 'A' Superstructure (Mining & Infrastructure)
 * 2. Perspective Expressway Highway Corridor (Direct Fleet Transport)
 * 3. 3D Faceted Crushed Stone Aggregate Crystals (Quarry Crushing)
 * 4. Industrial Metallic Titanium, Sapphire Blue, and Gold Bevel Reflections
 */
export const Corporate3DStructureMark: React.FC<{
  className?: string;
  sizePx?: number;
  interactive?: boolean;
}> = ({ className = '', sizePx, interactive = false }) => {
  const [rotate, setRotate] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    // Subtle 3D tilt
    setRotate({
      x: -(y / (rect.height / 2)) * 14,
      y: (x / (rect.width / 2)) * 14
    });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: '800px',
        width: sizePx ? `${sizePx}px` : undefined,
        height: sizePx ? `${sizePx}px` : undefined
      }}
      className={`relative inline-flex items-center justify-center transition-transform duration-200 select-none ${className}`}
      title="AARV BUILDCON INFRASTRUCTURE"
    >
      <div
        style={{
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale(${isHovered ? 1.05 : 1})`,
          transformStyle: 'preserve-3d',
          transition: 'transform 0.18s cubic-bezier(0.2, 0, 0, 1)'
        }}
        className="w-full h-full flex items-center justify-center filter drop-shadow-[0_8px_16px_rgba(15,23,42,0.18)] dark:drop-shadow-[0_8px_20px_rgba(2,132,199,0.25)]"
      >
        <svg
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full overflow-visible"
        >
          <defs>
            {/* 3D Base Ambient Shadow */}
            <filter id="aarv3dShadow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#0F172A" floodOpacity="0.4" />
            </filter>

            {/* Left Tower Front Gradient (Sapphire Industrial Steel) */}
            <linearGradient id="pylonLeftFront" x1="50" y1="20" x2="100" y2="175" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#38BDF8" />
              <stop offset="35%" stopColor="#2563EB" />
              <stop offset="100%" stopColor="#1E3A8A" />
            </linearGradient>

            {/* Left Tower 3D Depth Extrusion (Deep Shadow Facet) */}
            <linearGradient id="pylonLeftDepth" x1="20" y1="35" x2="80" y2="180" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#1E293B" />
              <stop offset="40%" stopColor="#0F172A" />
              <stop offset="100%" stopColor="#0B1329" />
            </linearGradient>

            {/* Right Tower Front Gradient (Metallic Titanium Cobalt) */}
            <linearGradient id="pylonRightFront" x1="150" y1="20" x2="100" y2="175" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#60A5FA" />
              <stop offset="45%" stopColor="#1D4ED8" />
              <stop offset="100%" stopColor="#0F2771" />
            </linearGradient>

            {/* Right Tower 3D Metallic Gold Bevel Extrusion */}
            <linearGradient id="pylonRightGoldDepth" x1="130" y1="30" x2="185" y2="180" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FCD34D" />
              <stop offset="25%" stopColor="#F59E0B" />
              <stop offset="70%" stopColor="#D97706" />
              <stop offset="100%" stopColor="#78350F" />
            </linearGradient>

            {/* 3D Superstructure Crossbeam (Industrial Girder) */}
            <linearGradient id="beamTop" x1="55" y1="102" x2="145" y2="102" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#93C5FD" />
              <stop offset="50%" stopColor="#60A5FA" />
              <stop offset="100%" stopColor="#38BDF8" />
            </linearGradient>

            <linearGradient id="beamFront" x1="100" y1="105" x2="100" y2="128" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#1E3A8A" />
              <stop offset="60%" stopColor="#0F172A" />
              <stop offset="100%" stopColor="#020617" />
            </linearGradient>

            {/* 3D Highway Roadway Perspective */}
            <linearGradient id="roadSurface" x1="100" y1="110" x2="100" y2="188" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#0F172A" />
              <stop offset="40%" stopColor="#1E293B" />
              <stop offset="100%" stopColor="#334155" />
            </linearGradient>

            {/* Apex Keystone Gold Shimmer */}
            <linearGradient id="apexShimmer" x1="100" y1="15" x2="100" y2="50" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FEF08A" />
              <stop offset="40%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#B45309" />
            </linearGradient>

            {/* Crushed Aggregate Crystal Rock 3D Facets */}
            <linearGradient id="rockFacetLight" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#94A3B8" />
              <stop offset="100%" stopColor="#64748B" />
            </linearGradient>
            <linearGradient id="rockFacetMid" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#475569" />
              <stop offset="100%" stopColor="#334155" />
            </linearGradient>
            <linearGradient id="rockFacetDark" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#1E293B" />
              <stop offset="100%" stopColor="#0F172A" />
            </linearGradient>
          </defs>

          {/* ================= 1. 3D Ground Base Shadow ================= */}
          <ellipse
            cx="100"
            cy="183"
            rx="78"
            ry="11"
            fill="#0F172A"
            opacity="0.32"
          />
          <ellipse
            cx="100"
            cy="182"
            rx="56"
            ry="7"
            fill="#020617"
            opacity="0.45"
          />

          {/* ================= 2. 3D Receding Highway Corridor (Transportation) ================= */}
          {/* Main Road Bed */}
          <polygon
            points="76,178 124,178 108,112 92,112"
            fill="url(#roadSurface)"
            stroke="#475569"
            strokeWidth="0.75"
          />
          {/* Road Curb Left (3D perspective edge) */}
          <polygon
            points="74,178 77,178 93,112 91,112"
            fill="#F59E0B"
            opacity="0.8"
          />
          {/* Road Curb Right */}
          <polygon
            points="123,178 126,178 109,112 107,112"
            fill="#F59E0B"
            opacity="0.8"
          />
          {/* Center Road Dashes (Receding Expressway Perspective) */}
          <polygon points="99,174 101,174 100.6,160 99.4,160" fill="#FEF08A" />
          <polygon points="99.3,153 100.7,153 100.4,142 99.6,142" fill="#FEF08A" />
          <polygon points="99.5,137 100.5,137 100.3,128 99.7,128" fill="#FEF08A" />
          <polygon points="99.6,124 100.4,124 100.2,117 99.8,117" fill="#FEF08A" />

          {/* ================= 3. Left 3D Structural Pylon ================= */}
          {/* Left Isometric Extruded Depth (Back Shadow Face) */}
          <polygon
            points="22,176 46,176 84,38 66,38"
            fill="url(#pylonLeftDepth)"
          />
          {/* Left Front Lighted Face */}
          <polygon
            points="46,176 72,176 100,32 84,38"
            fill="url(#pylonLeftFront)"
          />
          {/* Left Inner Arch Extrusion (Under-arch bevel) */}
          <polygon
            points="72,176 78,176 96,112 92,112"
            fill="#0F172A"
          />

          {/* ================= 4. Right 3D Structural Pylon ================= */}
          {/* Right Front Face */}
          <polygon
            points="100,32 116,38 154,176 128,176"
            fill="url(#pylonRightFront)"
          />
          {/* Right 3D Gold Extruded Bevel (Depth & Metallic Prestige) */}
          <polygon
            points="116,38 134,38 178,176 154,176"
            fill="url(#pylonRightGoldDepth)"
          />
          {/* Right Inner Arch Extrusion */}
          <polygon
            points="128,176 122,176 104,112 108,112"
            fill="#1E293B"
          />

          {/* ================= 5. 3D Architectural Crossbeam (The 'A' Girder) ================= */}
          {/* Girder 3D Top Bevel (Catching Daylight) */}
          <polygon
            points="61,104 139,104 133,98 67,98"
            fill="url(#beamTop)"
          />
          {/* Girder Front Face */}
          <polygon
            points="61,104 139,104 136,117 64,117"
            fill="url(#beamFront)"
          />
          {/* Industrial Structural Bolts on Girder */}
          <circle cx="70" cy="110.5" r="1.8" fill="#93C5FD" opacity="0.9" />
          <circle cx="78" cy="110.5" r="1.8" fill="#93C5FD" opacity="0.9" />
          <circle cx="122" cy="110.5" r="1.8" fill="#FCD34D" opacity="0.9" />
          <circle cx="130" cy="110.5" r="1.8" fill="#FCD34D" opacity="0.9" />

          {/* ================= 6. 3D Monument Apex Keystone (Summit Pyramid) ================= */}
          <polygon
            points="100,20 84,38 100,32"
            fill="url(#apexShimmer)"
          />
          <polygon
            points="100,20 100,32 116,38"
            fill="#FBBF24"
          />
          {/* Apex Highlight Glint */}
          <polygon
            points="100,19 96,27 100,25 104,27"
            fill="#FFFFFF"
            opacity="0.9"
          />

          {/* ================= 7. 3D Cut Aggregate Stone Crystals at Base (Quarry Mining) ================= */}
          {/* Left Stone Aggregate Cluster (Crushed Granite 20mm/40mm) */}
          <g transform="translate(14, 150)">
            {/* Aggregate Rock 1 */}
            <polygon points="12,18 24,10 32,15 28,26 14,25" fill="url(#rockFacetMid)" />
            <polygon points="12,18 24,10 21,5 8,11" fill="url(#rockFacetLight)" />
            <polygon points="24,10 32,15 30,7 21,5" fill="#CBD5E1" />
            <polygon points="12,18 14,25 6,21 8,11" fill="url(#rockFacetDark)" />
            {/* Rock highlight line */}
            <line x1="21" y1="5" x2="24" y2="10" stroke="#FFFFFF" strokeWidth="0.75" opacity="0.7" />
          </g>

          {/* Right Stone Aggregate Cluster (M-Sand & Quartzite Granules) */}
          <g transform="translate(150, 150)">
            {/* Golden Quartz Rock */}
            <polygon points="14,24 26,14 36,20 30,28 16,27" fill="#B45309" />
            <polygon points="14,24 26,14 22,7 10,14" fill="#F59E0B" />
            <polygon points="26,14 36,20 34,9 22,7" fill="#FDE68A" />
            <polygon points="14,24 16,27 7,22 10,14" fill="#78350F" />
            <line x1="22" y1="7" x2="26" y2="14" stroke="#FFFBEB" strokeWidth="0.75" opacity="0.8" />
          </g>

          {/* Precision Steel Baseline Bar */}
          <line
            x1="35"
            y1="178"
            x2="165"
            y2="178"
            stroke="url(#pylonRightGoldDepth)"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.7"
          />
        </svg>
      </div>
    </div>
  );
};

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  showText = true,
  className = '',
  is3dHoverable = true
}) => {
  const sizeMap = {
    sm: { px: 36, textTitle: 'text-sm font-black', textSubtitle: 'text-[10px]' },
    md: { px: 52, textTitle: 'text-lg sm:text-xl font-black tracking-wide', textSubtitle: 'text-[11px]' },
    lg: { px: 70, textTitle: 'text-xl sm:text-2xl font-black tracking-wider', textSubtitle: 'text-xs' },
    xl: { px: 96, textTitle: 'text-3xl sm:text-4xl font-black tracking-wider', textSubtitle: 'text-sm' },
    '2xl': { px: 120, textTitle: 'text-4xl sm:text-5xl font-black tracking-wider', textSubtitle: 'text-base' }
  }[size];

  return (
    <div className={`flex items-center gap-2.5 sm:gap-3.5 group select-none ${className}`}>
      {/* 3D Company Structure Emblem (Freestanding, No White Photo Box) */}
      <Corporate3DStructureMark
        sizePx={sizeMap.px}
        interactive={is3dHoverable}
        className="shrink-0 transition-transform duration-300 group-hover:scale-105"
      />

      {/* Typography Lockup */}
      {showText && (
        <div className="flex flex-col justify-center">
          <div className={`font-black tracking-wider uppercase text-slate-900 dark:text-white leading-none ${sizeMap.textTitle}`}>
            AARV BUILDCON
          </div>
          <div className={`text-blue-700 dark:text-blue-400 tracking-widest uppercase font-black mt-1 flex items-center gap-1.5 ${sizeMap.textSubtitle}`}>
            <span className="bg-gradient-to-r from-blue-700 to-blue-500 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
              INFRASTRUCTURE
            </span>
            <span className="text-amber-500 font-extrabold hidden sm:inline">• KHANAK</span>
          </div>
        </div>
      )}
    </div>
  );
};

/**
 * Featured 3D Corporate Structure Showcase Component
 * Gives users an interactive 3D model perspective of the company structure logo
 * with industrial credentials, aggregate mining symbols, and highway logistics.
 */
export const Corporate3DStructureBadge: React.FC<{
  lang?: 'hi' | 'en';
  onInspect?: () => void;
  className?: string;
}> = ({ lang = 'hi', className = '' }) => {
  return (
    <div className={`relative p-3.5 sm:p-4 bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950 text-white rounded-2xl border border-blue-500/30 shadow-xl overflow-hidden group hover:border-amber-500/50 transition-all duration-300 ${className}`}>
      {/* Dynamic Background Light Beam */}
      <div className="absolute -top-16 -right-16 w-36 h-36 bg-blue-500/20 rounded-full blur-2xl group-hover:bg-amber-500/20 transition-all pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-28 h-28 bg-cyan-500/15 rounded-full blur-xl pointer-events-none" />

      <div className="relative z-10 flex items-center gap-4">
        {/* 3D Structure Logo */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 shrink-0">
          <Corporate3DStructureMark interactive={true} className="w-full h-full" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 text-[9px] font-black uppercase tracking-wider bg-amber-500/20 text-amber-300 rounded border border-amber-500/30">
              {lang === 'hi' ? 'खनक स्टोन क्रशर' : 'Khanak Quarry & Plant'}
            </span>
            <span className="text-[10px] text-slate-400 hidden sm:inline">
              खनक (भिवानी) माइनिंग यूनिट
            </span>
          </div>
          <h4 className="text-sm sm:text-base font-black text-white uppercase tracking-tight mt-1 leading-snug">
            AARV BUILDCON INFRASTRUCTURE
          </h4>
          <p className="text-[11px] text-slate-300 leading-tight mt-0.5 line-clamp-1">
            {lang === 'hi'
              ? 'खनक स्टोन क्रशर प्लांट • हाईवे ट्रांसपोर्टेशन • थोक सप्लायर'
              : 'Khanak Stone Crusher Plant • Fleet Logistics • Wholesale'}
          </p>
        </div>
      </div>
    </div>
  );
};
