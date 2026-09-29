import React from 'react';

/**
 * State Emblem of India (Ashoka Lion Capital)
 */
export const AshokaEmblem: React.FC<{ className?: string }> = ({ className = 'w-7 h-9' }) => {
  return (
    <svg viewBox="0 0 100 130" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* 3 Lions representation */}
      {/* Center Lion Head */}
      <path
        d="M50 12 C44 12 39 16 38 23 C38 27 40 31 43 33 C40 34 38 37 38 41 C38 46 41 50 45 52 C44 54 44 57 45 60 C46 62 48 64 50 64 C52 64 54 62 55 60 C56 57 56 54 55 52 C59 50 62 46 62 41 C62 37 60 34 57 33 C60 31 62 27 62 23 C61 16 56 12 50 12 Z"
        fill="#334155"
      />
      {/* Center Lion Mane and details */}
      <circle cx="46" cy="24" r="1.5" fill="#FFFFFF" />
      <circle cx="54" cy="24" r="1.5" fill="#FFFFFF" />
      <path d="M48 29 Q50 31 52 29" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M46 36 Q50 39 54 36" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />

      {/* Left Lion Head & Profile */}
      <path
        d="M36 21 C31 22 26 26 25 33 C24 37 26 41 29 44 C26 45 24 49 25 54 C26 59 30 63 34 64 C35 66 37 68 40 69 L41 59 C38 58 36 55 36 52 C33 49 33 45 35 42 C33 39 33 35 36 32 Z"
        fill="#475569"
      />
      <circle cx="30" cy="32" r="1.3" fill="#FFFFFF" />

      {/* Right Lion Head & Profile */}
      <path
        d="M64 21 C69 22 74 26 75 33 C76 37 74 41 71 44 C74 45 76 49 75 54 C74 59 70 63 66 64 C65 66 63 68 60 69 L59 59 C62 58 64 55 64 52 C67 49 67 45 65 42 C67 39 67 35 64 32 Z"
        fill="#475569"
      />
      <circle cx="70" cy="32" r="1.3" fill="#FFFFFF" />

      {/* Base / Body of Lions */}
      <path
        d="M32 64 C32 64 36 68 50 68 C64 68 68 64 68 64 L69 77 C69 79 66 81 50 81 C34 81 31 79 31 77 Z"
        fill="#334155"
      />
      <path d="M42 68 L42 79 M50 68 L50 80 M58 68 L58 79" stroke="#64748B" strokeWidth="1" />

      {/* Abacus frieze */}
      <rect x="22" y="81" width="56" height="15" rx="2" fill="#1E293B" />

      {/* Ashoka Chakra in Center of Abacus */}
      <circle cx="50" cy="88.5" r="5.5" stroke="#38BDF8" strokeWidth="1" fill="#0F172A" />
      <circle cx="50" cy="88.5" r="1.5" fill="#38BDF8" />
      {/* Chakra Spokes */}
      <line x1="50" y1="83" x2="50" y2="94" stroke="#38BDF8" strokeWidth="0.8" />
      <line x1="44.5" y1="88.5" x2="55.5" y2="88.5" stroke="#38BDF8" strokeWidth="0.8" />
      <line x1="46" y1="84.5" x2="54" y2="92.5" stroke="#38BDF8" strokeWidth="0.8" />
      <line x1="46" y1="92.5" x2="54" y2="84.5" stroke="#38BDF8" strokeWidth="0.8" />

      {/* Bull on Right of Abacus */}
      <path d="M68 89 C70 87 72 87 74 89 L73 93 L68 93 Z" fill="#94A3B8" />

      {/* Horse on Left of Abacus */}
      <path d="M32 89 C30 87 28 87 26 89 L27 93 L32 93 Z" fill="#94A3B8" />

      {/* Inverted Bell Lotus Base */}
      <path
        d="M26 96 C30 96 34 108 50 108 C66 108 70 96 74 96 C76 96 78 97 78 99 C76 107 68 116 50 116 C32 116 24 107 22 99 C22 97 24 96 26 96 Z"
        fill="#475569"
      />
      {/* Lotus Petal ridges */}
      <path d="M38 98 Q42 112 50 114 Q58 112 62 98" stroke="#64748B" strokeWidth="1" fill="none" />
      <path d="M44 98 Q47 114 50 115 Q53 114 56 98" stroke="#94A3B8" strokeWidth="1" fill="none" />

      {/* Pedestal plinth */}
      <rect x="20" y="116" width="60" height="4" rx="1.5" fill="#334155" />
      <rect x="24" y="120" width="52" height="3" rx="1" fill="#1E293B" />
    </svg>
  );
};

/**
 * Nigrani360 Star Logo (Matching user's reference design)
 * Modern geometric star emblem featuring Indian tricolor ribbons and a prominent blue 'N' in the center
 */
export const NigraniLogo: React.FC<{ className?: string; imgClassName?: string }> = ({ 
  className = 'w-9 h-9',
  imgClassName = ''
}) => {
  return (
    <div className={`${className} flex items-center justify-center shrink-0 relative overflow-hidden rounded-xl bg-white shadow-xs border border-slate-100`}>
      <img 
        src="/nigrani_logo.png" 
        alt="Nigrani360 Logo" 
        className={`w-full h-full object-contain ${imgClassName}`} 
      />
    </div>
  );
};

/**
 * Pure SVG version of the Nigrani360 Star Logo
 */
export const NigraniStarSVG: React.FC<{ className?: string }> = ({ className = 'w-9 h-9' }) => {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="saffronGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFA14A" />
          <stop offset="100%" stopColor="#EA580C" />
        </linearGradient>
        <linearGradient id="greenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22C55E" />
          <stop offset="100%" stopColor="#15803D" />
        </linearGradient>
      </defs>
      
      {/* 5-pointed ribbon star geometry matching user design */}
      {/* Top right arm (Saffron) */}
      <polygon points="50,6 64,36 94,36 68,54 60,38" fill="url(#saffronGrad)" />
      
      {/* Left arm (Green) */}
      <polygon points="6,36 38,36 32,54 18,54" fill="url(#greenGrad)" />
      <polygon points="6,36 32,54 26,60" fill="#CBD5E1" opacity="0.8" />

      {/* Bottom left arm (Saffron) */}
      <polygon points="50,6 38,36 24,88 44,66" fill="url(#saffronGrad)" />
      <polygon points="24,88 44,66 50,76" fill="#94A3B8" opacity="0.6" />

      {/* Bottom right arm (Green) */}
      <polygon points="50,6 64,36 76,88 56,66" fill="url(#greenGrad)" />
      <polygon points="76,88 56,66 50,76" fill="#94A3B8" opacity="0.6" />

      {/* Center White Cutout so the letter 'N' stands out crisply */}
      <circle cx="50" cy="50" r="18" fill="white" />

      {/* Central Blue 'N' */}
      <text 
        x="50" 
        y="58" 
        textAnchor="middle" 
        fontSize="24" 
        fontWeight="900" 
        fontFamily="'Outfit', 'Times New Roman', serif" 
        fill="#002B9E"
        style={{ letterSpacing: '-0.5px' }}
      >
        N
      </text>
    </svg>
  );
};



/**
 * Indian Flag Icon (Rounded square badge with authentic tricolor & chakra)
 */
export const IndianFlagBadge: React.FC<{ className?: string }> = ({ className = 'w-8 h-8' }) => {
  return (
    <div className={`${className} rounded-lg overflow-hidden flex flex-col shadow-sm border border-slate-200/60 relative shrink-0`}>
      {/* Saffron */}
      <div className="h-1/3 bg-[#FF9933] w-full" />
      {/* White with Chakra */}
      <div className="h-1/3 bg-white w-full flex items-center justify-center relative">
        <svg viewBox="0 0 24 24" className="w-3 h-3 text-[#000080]" fill="none" stroke="currentColor">
          <circle cx="12" cy="12" r="4.5" strokeWidth="1.2" />
          <circle cx="12" cy="12" r="1" fill="#000080" />
          {/* 8 spokes */}
          <line x1="12" y1="7.5" x2="12" y2="16.5" strokeWidth="0.8" />
          <line x1="7.5" y1="12" x2="16.5" y2="12" strokeWidth="0.8" />
          <line x1="8.8" y1="8.8" x2="15.2" y2="15.2" strokeWidth="0.8" />
          <line x1="8.8" y1="15.2" x2="15.2" y2="8.8" strokeWidth="0.8" />
        </svg>
      </div>
      {/* India Green */}
      <div className="h-1/3 bg-[#138808] w-full" />
    </div>
  );
};

/**
 * Sidebar Bottom Artwork:
 * Slogan "Safe Citizens Stronger Nation", Dove, India Gate line sketch, and Saffron/White/Green flowing corner curves
 */
export const SidebarBottomArtwork: React.FC = () => {
  return (
    <div className="relative w-full overflow-hidden select-none pointer-events-none pt-4 pb-2">
      {/* Slogan */}
      <div className="px-5 mb-2 text-center relative z-10">
        <p className="text-[12px] font-semibold text-slate-600 tracking-tight leading-tight">
          Safe Citizens
        </p>
        <p className="text-[11px] font-normal text-slate-400 leading-tight">
          Stronger Nation
        </p>
      </div>

      {/* India Gate Line Drawing & Dove */}
      <div className="relative h-28 w-full flex items-end justify-center">
        {/* Flying Dove on top right */}
        <svg
          viewBox="0 0 24 24"
          className="w-5 h-5 absolute top-1 right-8 text-sky-400 opacity-80"
          fill="currentColor"
        >
          <path d="M12 4.5 C13 3 15 2 17 2.5 C19 3 20 4.5 20.5 6 C19 6.5 17 7 16 8 C17.5 9 19 10 20 10.5 C17 11.5 14 11 12 9 C11 11 9 12 7 13 C8 11.5 9 10 9 8.5 C7.5 9 5.5 9 4 8 C6 6.5 8 6 10 6.5 C10.5 5.5 11 5 12 4.5 Z" />
        </svg>

        {/* India Gate Line Art */}
        <svg
          viewBox="0 0 140 110"
          className="w-32 h-26 text-sky-700/35 mb-1"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
        >
          {/* Top bowl / urn */}
          <path d="M64 12 L76 12 L73 17 L67 17 Z" strokeWidth="1" />
          <line x1="62" y1="17" x2="78" y2="17" />

          {/* Top Stepped Attic */}
          <rect x="52" y="18" width="36" height="8" rx="0.5" />
          <line x1="56" y1="22" x2="84" y2="22" strokeWidth="0.8" />
          <rect x="44" y="26" width="52" height="7" rx="0.5" />
          <line x1="47" y1="30" x2="93" y2="30" strokeWidth="0.8" />

          {/* Main Entablature / Inscription band */}
          <rect x="36" y="33" width="68" height="11" rx="0.5" />
          <line x1="40" y1="38" x2="100" y2="38" strokeWidth="0.7" strokeDasharray="2 2" />

          {/* Main Pillars */}
          {/* Left Pylon */}
          <rect x="38" y="44" width="22" height="58" />
          <line x1="42" y1="44" x2="42" y2="102" strokeWidth="0.7" />
          <line x1="56" y1="44" x2="56" y2="102" strokeWidth="0.7" />
          {/* Small side arch left */}
          <path d="M44 76 Q49 70 54 76 L54 94 L44 94 Z" strokeWidth="0.9" />

          {/* Right Pylon */}
          <rect x="80" y="44" width="22" height="58" />
          <line x1="84" y1="44" x2="84" y2="102" strokeWidth="0.7" />
          <line x1="98" y1="44" x2="98" y2="102" strokeWidth="0.7" />
          {/* Small side arch right */}
          <path d="M86 76 Q91 70 96 76 L96 94 L86 94 Z" strokeWidth="0.9" />

          {/* Center Grand Archway */}
          <path d="M60 102 L60 68 Q70 54 80 68 L80 102" strokeWidth="1.4" />
          {/* Inner arch shadow */}
          <path d="M63 102 L63 71 Q70 60 77 71 L77 102" strokeWidth="0.8" strokeDasharray="1 1.5" />

          {/* Base Plinth / Steps */}
          <rect x="32" y="102" width="76" height="4" />
          <rect x="28" y="106" width="84" height="3" />
        </svg>

        {/* Tricolor Ribbon Curves at Bottom-Left */}
        <svg
          viewBox="0 0 200 100"
          className="absolute bottom-0 left-0 w-48 h-24 -ml-4 -mb-2"
          fill="none"
        >
          {/* Saffron Curve */}
          <path
            d="M-10 95 C40 90, 80 50, 150 55 C180 57, 200 65, 210 70 L210 105 L-10 105 Z"
            fill="url(#saffron-grad)"
            opacity="0.35"
          />
          {/* White / Light Curve */}
          <path
            d="M-10 98 C35 94, 75 60, 140 68 C170 72, 195 80, 210 85 L210 105 L-10 105 Z"
            fill="#FFFFFF"
            opacity="0.7"
          />
          {/* Green Curve */}
          <path
            d="M-10 102 C30 98, 70 75, 130 82 C165 86, 190 94, 210 98 L210 105 L-10 105 Z"
            fill="url(#green-grad)"
            opacity="0.4"
          />

          <defs>
            <linearGradient id="saffron-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF9933" />
              <stop offset="100%" stopColor="#F97316" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="green-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#138808" />
              <stop offset="100%" stopColor="#10B981" stopOpacity="0.1" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
};

/**
 * India Map with Mesh Network Nodes for the Hero Banner
 */
export const IndiaNetworkMap: React.FC<{ className?: string }> = ({ className = 'w-72 h-48' }) => {
  return (
    <div className={`relative ${className} select-none pointer-events-none`}>
      <svg viewBox="0 0 280 200" className="w-full h-full" fill="none">
        {/* Subtle India boundary silhouette */}
        <path
          d="M125 15 
             C132 12, 140 18, 145 25 
             C155 30, 165 28, 175 32
             C185 36, 195 42, 210 40
             C225 38, 235 48, 240 55
             C245 62, 230 68, 225 72
             C215 78, 205 75, 195 80
             C190 85, 185 92, 182 100
             C178 112, 172 125, 165 140
             C158 155, 150 175, 145 185
             C142 190, 138 185, 135 175
             C130 160, 122 145, 115 135
             C108 125, 95 118, 92 105
             C88 95, 78 88, 80 80
             C82 72, 92 68, 100 62
             C108 55, 115 40, 118 30
             Z"
          fill="#3B82F6"
          fillOpacity="0.08"
          stroke="#60A5FA"
          strokeWidth="1"
          strokeOpacity="0.4"
        />

        {/* Network Connecting Lines */}
        <g stroke="#3B82F6" strokeWidth="1" strokeOpacity="0.3" strokeDasharray="3 3">
          {/* North to Central */}
          <line x1="130" y1="35" x2="135" y2="70" />
          <line x1="135" y1="70" x2="110" y2="95" />
          <line x1="135" y1="70" x2="165" y2="85" />
          {/* East to Central */}
          <line x1="165" y1="85" x2="215" y2="55" />
          <line x1="165" y1="85" x2="155" y2="120" />
          {/* West to South */}
          <line x1="110" y1="95" x2="125" y2="135" />
          <line x1="125" y1="135" x2="145" y2="165" />
          <line x1="155" y1="120" x2="145" y2="165" />
          {/* Diagonal chords */}
          <line x1="135" y1="70" x2="125" y2="135" />
          <line x1="110" y1="95" x2="155" y2="120" />
        </g>

        {/* Network Node Dots */}
        {/* Srinagar/Jammu */}
        <circle cx="130" cy="35" r="3" fill="#2563EB" fillOpacity="0.8" />
        <circle cx="130" cy="35" r="6" stroke="#60A5FA" strokeWidth="1" strokeOpacity="0.5" />

        {/* Delhi (Command HQ) */}
        <circle cx="135" cy="70" r="4.5" fill="#2563EB" />
        <circle cx="135" cy="70" r="8" stroke="#3B82F6" strokeWidth="1.2" strokeOpacity="0.6">
          <animate attributeName="r" values="6;10;6" dur="3s" repeatCount="indefinite" />
          <animate attributeName="stroke-opacity" values="0.8;0.2;0.8" dur="3s" repeatCount="indefinite" />
        </circle>

        {/* Mumbai */}
        <circle cx="110" cy="95" r="3.5" fill="#2563EB" fillOpacity="0.9" />
        <circle cx="110" cy="95" r="6.5" stroke="#60A5FA" strokeWidth="1" strokeOpacity="0.5" />

        {/* Kolkata */}
        <circle cx="165" cy="85" r="3.5" fill="#2563EB" fillOpacity="0.9" />
        <circle cx="165" cy="85" r="6.5" stroke="#60A5FA" strokeWidth="1" strokeOpacity="0.5" />

        {/* Guwahati */}
        <circle cx="215" cy="55" r="3" fill="#2563EB" fillOpacity="0.75" />

        {/* Hyderabad */}
        <circle cx="138" cy="115" r="3" fill="#2563EB" fillOpacity="0.85" />

        {/* Bengaluru */}
        <circle cx="125" cy="135" r="3.5" fill="#2563EB" fillOpacity="0.9" />
        <circle cx="125" cy="135" r="6.5" stroke="#60A5FA" strokeWidth="1" strokeOpacity="0.5" />

        {/* Chennai */}
        <circle cx="155" cy="120" r="3" fill="#2563EB" fillOpacity="0.85" />

        {/* Kanyakumari / South */}
        <circle cx="145" cy="165" r="3" fill="#2563EB" fillOpacity="0.85" />
      </svg>
    </div>
  );
};

/**
 * Empty State Illustration:
 * Cute document with checkmark badge, pastel sparkles, and surrounding decorative blobs
 */
export const EmptyStateIllustration: React.FC = () => {
  return (
    <div className="relative w-36 h-36 flex items-center justify-center select-none">
      {/* Background soft pastel blob */}
      <div className="absolute w-28 h-28 rounded-full bg-gradient-to-tr from-sky-100/80 via-emerald-50/70 to-indigo-100/60 blur-md -z-0" />

      {/* Sparkles / Stars */}
      <svg viewBox="0 0 140 140" className="w-full h-full absolute inset-0 -z-0" fill="none">
        {/* Star 1 top right (amber/peach) */}
        <path
          d="M105 32 Q108 38 114 41 Q108 44 105 50 Q102 44 96 41 Q102 38 105 32 Z"
          fill="#FBBF24"
          opacity="0.8"
        />
        {/* Star 2 left (soft pink) */}
        <path
          d="M28 68 Q30 73 35 75 Q30 77 28 82 Q26 77 21 75 Q26 73 28 68 Z"
          fill="#F472B6"
          opacity="0.7"
        />
        {/* Dot 1 top left (cyan) */}
        <circle cx="42" cy="38" r="3" fill="#38BDF8" opacity="0.6" />
        {/* Dot 2 bottom right (green) */}
        <circle cx="108" cy="98" r="3.5" fill="#34D399" opacity="0.6" />
      </svg>

      {/* Main Document Card */}
      <div className="relative z-10 w-20 h-24 bg-white rounded-xl shadow-lg border border-slate-200/90 flex flex-col p-3 -rotate-1">
        {/* Folded corner top right */}
        <div className="absolute top-0 right-0 w-5 h-5 bg-slate-100 rounded-bl-lg border-b border-l border-slate-200/70" />

        {/* Text lines */}
        <div className="w-7 h-1.5 bg-blue-200 rounded-full mb-2 mt-1" />
        <div className="w-11 h-1 bg-slate-200 rounded-full mb-1.5" />
        <div className="w-12 h-1 bg-slate-200 rounded-full mb-1.5" />
        <div className="w-8 h-1 bg-slate-200 rounded-full mb-2" />

        {/* Circular Checkmark Badge overlapping bottom right */}
        <div className="absolute -bottom-2 -right-2 w-9 h-9 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-md border-2 border-white">
          <svg viewBox="0 0 20 20" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="4 11 8 15 16 6" />
          </svg>
        </div>
      </div>
    </div>
  );
};

/**
 * Botanical Leaf Illustration for bottom-right corner of the table card
 */
export const BotanicalAccent: React.FC<{ className?: string }> = ({ className = 'w-40 h-40' }) => {
  return (
    <div className={`absolute bottom-0 right-0 pointer-events-none select-none ${className} opacity-70`}>
      <svg viewBox="0 0 160 160" className="w-full h-full" fill="none">
        {/* Stem 1 (Blue/Cyan) */}
        <path
          d="M170 170 Q130 140 115 100 Q105 70 120 40"
          stroke="#93C5FD"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.5"
        />
        {/* Leaves along stem 1 */}
        <path
          d="M115 100 C100 95 85 105 90 120 C100 125 112 115 115 100 Z"
          fill="#60A5FA"
          opacity="0.35"
        />
        <path
          d="M110 80 C95 72 82 82 88 95 C98 98 108 90 110 80 Z"
          fill="#3B82F6"
          opacity="0.3"
        />
        <path
          d="M118 60 C108 50 98 56 102 68 C110 72 118 68 118 60 Z"
          fill="#93C5FD"
          opacity="0.4"
        />
        <path
          d="M120 40 C118 25 130 20 138 30 C140 42 130 45 120 40 Z"
          fill="#60A5FA"
          opacity="0.45"
        />

        {/* Stem 2 (Soft Emerald / Green) */}
        <path
          d="M170 160 Q145 120 130 90 Q120 65 140 45"
          stroke="#86EFAC"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.4"
        />
        {/* Leaves along stem 2 */}
        <path
          d="M135 110 C145 100 158 106 155 120 C145 125 135 118 135 110 Z"
          fill="#34D399"
          opacity="0.3"
        />
        <path
          d="M128 85 C140 75 150 82 146 94 C136 98 128 92 128 85 Z"
          fill="#10B981"
          opacity="0.3"
        />
      </svg>
    </div>
  );
};
