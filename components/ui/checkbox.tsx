"use client"

import * as React from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

const Checkbox = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & {
    indeterminate?: boolean
  }
>(({ className, indeterminate, ...props }, ref) => {
  const innerRef = React.useRef<HTMLInputElement>(null)

  React.useImperativeHandle(ref, () => innerRef.current!)

  React.useEffect(() => {
    if (innerRef.current) {
      innerRef.current.indeterminate = !!indeterminate
    }
  }, [indeterminate])

  return (
    <div className="relative">
      <input type="checkbox" ref={innerRef} className="peer h-4 w-4 shrink-0 opacity-0 absolute" {...props} />
      <div
        className={cn(
          "h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2 peer-disabled:cursor-not-allowed peer-disabled:opacity-50 flex items-center justify-center",
          "peer-checked:bg-primary peer-checked:text-primary-foreground",
          className,
        )}
      >
        {props.checked && <Check className="h-3 w-3" />}
      </div>
    </div>
  )
})
Checkbox.displayName = "Checkbox"

export { Checkbox }

