import logoImage from "../assets/jobdojo-logo.png";

const Logo = ({ size = "md", variant = "gradient", showText = true, className = "" }) => {
  const sizeClasses = {
    sm: { image: "h-8", text: "text-lg" },
    md: { image: "h-10", text: "text-xl" },
    lg: { image: "h-14", text: "text-2xl" },
    xl: { image: "h-20", text: "text-4xl" },
  };

  const selectedSize = sizeClasses[size] || sizeClasses.md;

  return (
    <div className={`flex items-center gap-3 transition-all group ${className}`}>
      <img 
        src={logoImage} 
        alt="JobDojo Logo" 
        className={`${selectedSize.image} object-contain transition-transform group-hover:scale-105 active:scale-95 drop-shadow-md rounded-xl`} 
      />
      {showText && (
        <span className={`${selectedSize.text} font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-600 to-brand-500`}>
          JobDojo
        </span>
      )}
    </div>
  );
};

export default Logo;
