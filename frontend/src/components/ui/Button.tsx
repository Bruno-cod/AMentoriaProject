// src/components/ui/Button.tsx
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
  children: React.ReactNode;
}

export function Button({ variant = 'primary', children, className, ...props }: ButtonProps) {
  const baseStyles = "px-8 py-2 rounded-3xl font-medium transition-all hover:scale-105 cursor-pointer";
  
  const variants = {
    primary: "bg-[linear-gradient(105deg,var(--primary-600)_19%,var(--secondary-400)_100%)] text-white text-h4",
    outline: "border-2 border-neutras-900 text-neutras-900 bg-transparent",
    ghost: "text-neutras-400 hover:text-white"
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}