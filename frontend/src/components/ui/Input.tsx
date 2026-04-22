

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  onMenuClick?: () => void;
}

export function Input({ icon, className, onMenuClick, ...props }: InputProps) {
  return (
    <div className="w-full relative flex items-center p-3 bg-white rounded-lg border-2 border-neutras-200 shadow-[0px_4px_15px_-3px_rgba(107,33,168,0.3)] transition-all focus-within:border-primaria/50">
      
      
      {icon && (
        <button
          onClick={onMenuClick}
          className="absolute left-5 bg-secundaria p-2 rounded-lg text-white font-bold flex items-center justify-center hover:scale-105 transition-transform cursor-pointer z-10"
        >
          {icon}
        </button>
      )}
      <input
        {...props}
        className={`w-full bg-transparent outline-none text-body-large text-neutras-900 placeholder:text-neutras-400 text-center px-12 ${className}`}
      />
    </div>
  );
}