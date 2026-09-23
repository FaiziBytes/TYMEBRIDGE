import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 cursor-pointer rounded-pill font-medium whitespace-nowrap transition-[transform,box-shadow,background-color,color] duration-200 ease-brand outline-none focus-visible:ring-2 focus-visible:ring-brand/40 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:translate-y-px active:scale-[0.99]",
  {
    variants: {
      variant: {
        primary:
          "bg-brand-600 text-white shadow-soft hover:bg-brand-700 hover:shadow-volt",
        navy: "bg-navy text-white hover:bg-forest-800",
        outlineBrand:
          "border border-brand-600 bg-paper text-brand-800 hover:bg-fill",
        outlineNavy: "border border-navy bg-paper text-navy hover:bg-line",
        default: "bg-brand-600 text-white shadow-soft hover:bg-brand-700",
        secondary: "bg-fill text-brand-800 hover:bg-brand-200",
        outline:
          "border border-border bg-paper text-ink hover:bg-fill hover:text-brand-800",
        ghost: "text-ink hover:bg-fill hover:text-brand-800",
        destructive: "bg-[#e5484d] text-white hover:bg-[#d13b40]",
        link: "text-brand-800 underline-offset-4 hover:underline",
      },
      size: {
        lg: "h-[60px] px-8 text-xl max-[560px]:h-9 max-[560px]:px-4 max-[560px]:text-xs",
        md: "h-[52px] px-6 text-base max-[560px]:h-9 max-[560px]:px-4 max-[560px]:text-xs",
        sm: "h-11 px-3 text-sm max-[560px]:h-8 max-[560px]:px-3 max-[560px]:text-xs",
        default: "h-10 px-4 py-2 text-sm max-[560px]:h-8 max-[560px]:text-xs",
        icon: "size-10 max-[560px]:size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { buttonVariants, buttonVariants as landingButtonVariants };
