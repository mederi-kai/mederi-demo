// カスタマイズ済み

import { VariantProps, cva } from "class-variance-authority";
import * as React from "react";

import { cn } from "~/lib/utils";

const tagVariants = cva("", {
  variants: {
    color: {
      purple: "bg-purple",
      orange: "bg-orange",
      yellow: "bg-yellow",
      green: "bg-green",
      blue: "bg-blue",
      pink: "bg-pink",
      brown: "bg-brown",
      beige: "bg-beige",
      gray: "bg-gray",
    },
    rounded: {
      default: "rounded-md",
      sm: "rounded-sm",
      md: "rounded-md",
      full: "rounded-full",
    },
  },
  defaultVariants: {
    color: "pink",
    rounded: "default",
  },
});

interface TagProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "color">,
    VariantProps<typeof tagVariants> {}

function Tag({ className, color, rounded, ...props }: TagProps) {
  return (
    <>
      <span
        className={cn(
          "inline-flex items-center font-normal break-keep cursor-default px-2.5 py-0.5 text-xs transition-colors",
          "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
          tagVariants({ color, rounded }),
          className
        )}
        {...props}
      />
    </>
  );
}

export { Tag, tagVariants };
