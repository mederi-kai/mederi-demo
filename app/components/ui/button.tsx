// カスタマイズ済み

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "~/lib/utils";

const buttonVariants = cva("", {
  variants: {
    variant: {
      default: "bg-border hover:bg-border/90",
      primary: "bg-button-primary hover:bg-button-primary/80",
      secondary: "bg-button-secondary text-white hover:bg-button-secondary/80",
      tertiary: "bg-[#6a6a6a] hover:bg-[#6a6a6a]/90",
      outline: "bg-white border text-[#b7b3b1]",
      // ghost: "hover:bg-accent hover:text-accent-foreground",
      // link: "text-primary underline-offset-4 hover:underline",
    },
    size: {
      default: "h-10 px-4 py-2 text-sm",
      sm: "h-9 rounded-md px-3 text-xs",
      lg: "h-14 rounded-xl px-10 text-lg",
      icon: "h-8 w-8 rounded-md",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

type ButtonVariants = VariantProps<typeof buttonVariants>;

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color">,
    ButtonVariants {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-md font-semibold text-white transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-button focus-visible:ring-offset-2",
          "disabled:bg-border disabled:text-white disabled:cursor-not-allowed",
          buttonVariants({ variant, size, className })
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
