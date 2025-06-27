interface LogoProps {
  className?: string;
}

export default function DotComDaddyLogo({ className = "w-10 h-10" }: LogoProps) {
  return (
    <svg 
      width="40" 
      height="40" 
      viewBox="0 0 40 40" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Main circular background */}
      <circle cx="20" cy="20" r="18" fill="#0F0F23" stroke="#A259FF" strokeWidth="2"/>
      
      {/* Globe/Domain icon */}
      <circle cx="20" cy="20" r="12" fill="none" stroke="#A259FF" strokeWidth="1.5" opacity="0.8"/>
      
      {/* Globe grid lines */}
      <path d="M8 20 C8 20, 14 16, 20 16 C26 16, 32 20, 32 20" stroke="#A259FF" strokeWidth="1" opacity="0.6"/>
      <path d="M8 20 C8 20, 14 24, 20 24 C26 24, 32 20, 32 20" stroke="#A259FF" strokeWidth="1" opacity="0.6"/>
      <path d="M20 8 C20 8, 16 14, 16 20 C16 26, 20 32, 20 32" stroke="#A259FF" strokeWidth="1" opacity="0.6"/>
      <path d="M20 8 C20 8, 24 14, 24 20 C24 26, 20 32, 20 32" stroke="#A259FF" strokeWidth="1" opacity="0.6"/>
      
      {/* Rocket/Growth element */}
      <path d="M14 26 L17 23 L20 24 L23 21 L26 22" stroke="#FF8C42" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M23 22 L26 19 L26 22 L23 22" fill="#FF8C42"/>
      
      {/* Crown element (more modern) */}
      <path d="M16 14 L18 12 L20 14 L22 12 L24 14 L23 17 L17 17 Z" fill="#A259FF"/>
      <circle cx="20" cy="11" r="1.5" fill="#FF8C42"/>
      
      {/* Domain dots */}
      <circle cx="13" cy="13" r="1" fill="#A259FF" opacity="0.7"/>
      <circle cx="27" cy="13" r="1" fill="#A259FF" opacity="0.7"/>
      <circle cx="13" cy="27" r="1" fill="#A259FF" opacity="0.7"/>
      <circle cx="27" cy="27" r="1" fill="#A259FF" opacity="0.7"/>
    </svg>
  );
}