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
      {/* Globe base */}
      <circle cx="20" cy="20" r="16" fill="#1A1A1A" stroke="#FF6B35" strokeWidth="2"/>
      
      {/* Globe grid lines */}
      <path d="M4 20 C4 20, 10 15, 20 15 C30 15, 36 20, 36 20" stroke="#FF6B35" strokeWidth="1.5" fill="none" opacity="0.7"/>
      <path d="M4 20 C4 20, 10 25, 20 25 C30 25, 36 20, 36 20" stroke="#FF6B35" strokeWidth="1.5" fill="none" opacity="0.7"/>
      <path d="M20 4 C20 4, 15 10, 15 20 C15 30, 20 36, 20 36" stroke="#FF6B35" strokeWidth="1.5" fill="none" opacity="0.7"/>
      <path d="M20 4 C20 4, 25 10, 25 20 C25 30, 20 36, 20 36" stroke="#FF6B35" strokeWidth="1.5" fill="none" opacity="0.7"/>
      
      {/* Rising arrow/growth element */}
      <path d="M12 24 L16 20 L20 22 L24 18 L28 20" stroke="#9333EA" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      
      {/* Arrow tip */}
      <path d="M25 20 L28 17 L28 20 L25 20" fill="#9333EA"/>
      
      {/* Crown/daddy element (simplified) */}
      <path d="M16 12 L18 10 L20 12 L22 10 L24 12 L23 16 L17 16 Z" fill="#FF6B35"/>
      
      {/* Dot accent */}
      <circle cx="20" cy="8" r="2" fill="#9333EA"/>
    </svg>
  );
}