// components/ui/loading-button.tsx
"use client";

import * as React from "react";
import { Loader2 } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import type { VariantProps } from "class-variance-authority";

interface LoadingButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
}

export const LoadingButton = React.forwardRef<
  HTMLButtonElement,
  LoadingButtonProps
>(
  (
    {
      isLoading = false,
      children,
      className,
      variant,
      size,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        className={cn(className)}
        disabled={isLoading || disabled}
        {...props}
      >
        {isLoading && <Loader2 className="animate-spin h-6 w-6 mr-2" />}
        {children}
      </Button>
    );
  }
);

LoadingButton.displayName = "LoadingButton";
