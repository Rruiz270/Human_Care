import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-[#B8755C] text-white",
        secondary:
          "border-transparent bg-[#8B9E7C] text-white",
        destructive:
          "border-transparent bg-red-500 text-white",
        outline: "border-[#8C8580]/40 text-[#8C8580]",
        success:
          "border-transparent bg-[#8B9E7C] text-white",
        warning:
          "border-transparent bg-amber-500 text-white",
        info:
          "border-transparent bg-[#B8755C]/80 text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
