import React from 'react';

interface HealthyBowlIllustrationProps {
  className?: string;
  compact?: boolean;
}

export const HealthyBowlIllustration: React.FC<HealthyBowlIllustrationProps> = ({
  className = '',
  compact = false,
}) => {
  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      {/* Background Soft Glow */}
      <div className="absolute w-44 h-44 rounded-full bg-blue-100/60 blur-xl pointer-events-none" />

      <svg
        viewBox="0 0 260 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`w-full ${compact ? 'max-h-36' : 'max-h-48'} drop-shadow-sm`}
      >
        <defs>
          <linearGradient id="bgBlob" x1="20" y1="20" x2="240" y2="180" gradientUnits="userSpaceOnUse">
            <stop stopColor="#E0F2FE" stopOpacity="0.8" />
            <stop stopColor="#DBEAFE" stopOpacity="0.4" />
          </linearGradient>

          <linearGradient id="bowlGrad" x1="70" y1="120" x2="190" y2="175" gradientUnits="userSpaceOnUse">
            <stop stopColor="#3B82F6" />
            <stop stopColor="#1D4ED8" />
          </linearGradient>

          <linearGradient id="eggYolk" x1="120" y1="85" x2="135" y2="105" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FBBF24" />
            <stop stopColor="#F59E0B" />
          </linearGradient>

          <linearGradient id="avocadoFlesh" x1="60" y1="95" x2="85" y2="130" gradientUnits="userSpaceOnUse">
            <stop stopColor="#A7F3D0" />
            <stop stopColor="#6EE7B7" />
          </linearGradient>

          <linearGradient id="avocadoSkin" x1="55" y1="90" x2="90" y2="135" gradientUnits="userSpaceOnUse">
            <stop stopColor="#065F46" />
            <stop stopColor="#047857" />
          </linearGradient>

          <linearGradient id="milkGlass" x1="200" y1="70" x2="225" y2="140" gradientUnits="userSpaceOnUse">
            <stop stopColor="#E0F2FE" />
            <stop stopColor="#BAE6FD" />
          </linearGradient>
        </defs>

        {/* Ambient background blob */}
        <ellipse cx="130" cy="115" rx="100" ry="60" fill="url(#bgBlob)" />

        {/* Decorative Floating Leaves */}
        <g opacity="0.85">
          <path d="M42 90C36 78 45 68 56 70C57 82 48 91 42 90Z" fill="#10B981" />
          <path d="M42 90C47 80 54 75 56 70" stroke="#059669" strokeWidth="1" />
          <path d="M220 65C230 55 242 62 240 73C230 75 222 72 220 65Z" fill="#34D399" />
        </g>

        {/* Milk Glass / Bottle behind bowl */}
        <g id="milk-bottle">
          {/* Glass body */}
          <rect x="200" y="80" width="24" height="42" rx="4" fill="url(#milkGlass)" />
          {/* Milk liquid */}
          <rect x="202" y="92" width="20" height="28" rx="2" fill="#FFFFFF" fillOpacity="0.9" />
          {/* Glass rim / cap */}
          <rect x="204" y="75" width="16" height="5" rx="2" fill="#60A5FA" />
          {/* Straw */}
          <path d="M214 62L217 76" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" />
        </g>

        {/* Main Salad Bowl */}
        {/* Bowl shadow */}
        <ellipse cx="130" cy="165" rx="65" ry="10" fill="#CBD5E1" fillOpacity="0.6" />

        {/* Salad Greens & Lettuce base */}
        <path
          d="M85 110C75 100 80 85 92 88C100 80 115 80 120 90C130 82 145 84 150 92C160 84 175 88 178 98C185 106 180 118 175 125C170 125 90 125 85 110Z"
          fill="#10B981"
        />
        {/* Additional lettuce ruffles */}
        <circle cx="95" cy="98" r="14" fill="#34D399" />
        <circle cx="165" cy="100" r="12" fill="#34D399" />

        {/* Steamed Rice / Quinoa mound */}
        <ellipse cx="150" cy="115" rx="26" ry="16" fill="#F8FAFC" />
        <circle cx="145" cy="112" r="2" fill="#CBD5E1" />
        <circle cx="155" cy="110" r="2" fill="#CBD5E1" />
        <circle cx="150" cy="118" r="2" fill="#CBD5E1" />

        {/* Grilled Chicken Breast Slices */}
        <g id="chicken">
          <path
            d="M135 120C135 110 155 105 168 112C178 118 170 130 155 130C142 130 135 126 135 120Z"
            fill="#D97706"
          />
          {/* Grill marks */}
          <line x1="145" y1="114" x2="152" y2="124" stroke="#78350F" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="154" y1="116" x2="161" y2="125" stroke="#78350F" strokeWidth="1.5" strokeLinecap="round" />
        </g>

        {/* Cucumber slices */}
        <g id="cucumbers">
          <circle cx="100" cy="122" r="11" fill="#4ADE80" stroke="#16A34A" strokeWidth="2.5" />
          <circle cx="100" cy="122" r="7" fill="#86EFAC" />
          <circle cx="114" cy="126" r="10" fill="#4ADE80" stroke="#16A34A" strokeWidth="2.5" />
          <circle cx="114" cy="126" r="6" fill="#86EFAC" />
        </g>

        {/* Boiled Egg Half */}
        <g id="boiled-egg">
          {/* Egg White */}
          <ellipse cx="128" cy="100" rx="15" ry="18" transform="rotate(-15 128 100)" fill="#FFFFFF" />
          {/* Egg Yolk */}
          <ellipse cx="129" cy="102" rx="9" ry="11" transform="rotate(-15 129 102)" fill="url(#eggYolk)" />
          {/* Highlight */}
          <ellipse cx="126" cy="98" rx="2" ry="3" fill="#FEF3C7" />
        </g>

        {/* Avocado Half Slice */}
        <g id="avocado">
          {/* Avocado dark peel */}
          <path
            d="M68 126C60 115 65 98 75 92C85 86 96 95 98 108C100 120 92 134 80 134C73 134 71 130 68 126Z"
            fill="url(#avocadoSkin)"
          />
          {/* Avocado flesh */}
          <path
            d="M71 124C65 115 69 101 77 96C85 91 93 98 94 109C96 119 89 130 79 130C74 130 73 127 71 124Z"
            fill="url(#avocadoFlesh)"
          />
          {/* Avocado pit / seed hole */}
          <circle cx="82" cy="116" r="7" fill="#78350F" />
          <circle cx="80" cy="114" r="2" fill="#B45309" />
        </g>

        {/* Cherry Tomatoes */}
        <g id="tomatoes">
          {/* Tomato 1 */}
          <circle cx="112" cy="138" r="8" fill="#EF4444" />
          <circle cx="110" cy="136" r="2" fill="#FCA5A5" />
          {/* Little green stem */}
          <path d="M112 131L114 128M112 131L110 129" stroke="#16A34A" strokeWidth="1.2" strokeLinecap="round" />

          {/* Tomato 2 */}
          <circle cx="127" cy="142" r="7" fill="#DC2626" />
          <circle cx="125" cy="140" r="1.8" fill="#FCA5A5" />
        </g>

        {/* Front Bowl Ceramic Silhouette */}
        <path
          d="M70 124C70 124 82 168 130 168C178 168 190 124 190 124C190 124 180 134 130 134C80 134 70 124 70 124Z"
          fill="url(#bowlGrad)"
        />
        {/* Bowl Rim highlight */}
        <ellipse cx="130" cy="125" rx="60" ry="6" fill="#60A5FA" fillOpacity="0.4" />
      </svg>
    </div>
  );
};
