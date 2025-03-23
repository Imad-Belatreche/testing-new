"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

const Popover = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    open?: boolean
    onOpenChange?: (open: boolean) => void
  }
>(({ className, children, open, onOpenChange, ...props }, ref) => {
  const [isOpen, setIsOpen] = React.useState(open || false)

  React.useEffect(() => {
    if (open !== undefined) {
      setIsOpen(open)
    }
  }, [open])

  const handleOpenChange = (value: boolean) => {
    setIsOpen(value)
    onOpenChange?.(value)
  }

  return (
    <div ref={ref} className={cn("relative", className)} {...props}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          if (child.type === PopoverTrigger) {
            return React.cloneElement(child as React.ReactElement<any>, {
              onClick: () => handleOpenChange(!isOpen),
            })
          }
          if (child.type === PopoverContent) {
            return isOpen ? child : null
          }
        }
        return child
      })}
    </div>
  )
})
Popover.displayName = "Popover"

const PopoverTrigger = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, ...props }, ref) => <button ref={ref} className={cn("", className)} {...props} />,
)
PopoverTrigger.displayName = "PopoverTrigger"

const PopoverContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    align?: "start" | "center" | "end"
    sideOffset?: number
  }
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      "absolute",
      {
        "left-0": align === "start",
        "left-1/2 -translate-x-1/2": align === "center",
        "right-0": align === "end",
      },
      "top-full mt-2",
      className,
    )}
    {...props}
  />
))
PopoverContent.displayName = "PopoverContent"

export { Popover, PopoverTrigger, PopoverContent }

