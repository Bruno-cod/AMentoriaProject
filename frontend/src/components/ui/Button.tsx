import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
 
  "inline-flex items-center justify-center whitespace-nowrap rounded-3xl font-medium transition-all hover:scale-105 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
       
        default:
          "bg-[linear-gradient(105deg,var(--primary-600)_19%,var(--secondary-400)_100%)] text-white text-h4",
        
       
        outline:
          "border-2 border-neutras-900 text-neutras-900 bg-transparent",
        
        ghost: 
          "text-neutras-400 hover:text-white",
          
        icon: 
          "bg-background/80 text-foreground backdrop-blur-sm hover:bg-background",

          menuItem: "h-auto flex-col gap-1.5 p-2 rounded-2xl bg-transparent hover:bg-white/20 text-white border-0",
      },
      size: {
  
        default: "px-8 py-2",
        sm: "h-8 px-3 text-xs",
        lg: "h-10 px-8",
        icon: "h-9 w-9 rounded-full", 
        none: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }