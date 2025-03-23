"use client"

import * as React from "react"
import { Check, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

const Select = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    value?: string
    onValueChange?: (value: string) => void
    defaultValue?: string
  }
>(({ className, children, value, onValueChange, defaultValue, ...props }, ref) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const [selectedValue, setSelectedValue] = React.useState(value || defaultValue || "")

  React.useEffect(() => {
    if (value !== undefined) {
      setSelectedValue(value)
    }
  }, [value])

  const handleValueChange = (newValue: string) => {
    setSelectedValue(newValue)
    onValueChange?.(newValue)
    setIsOpen(false)
  }

  return (
    <div ref={ref} className={cn("relative", className)} {...props}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          if (child.type === SelectTrigger) {
            return React.cloneElement(child as React.ReactElement<any>, {
              onClick: () => setIsOpen(!isOpen),
              value: selectedValue,
            })
          }
          if (child.type === SelectContent) {
            return isOpen
              ? React.cloneElement(child as React.ReactElement<any>, {
                  onValueChange: handleValueChange,
                  value: selectedValue,
                })
              : null
          }
        }
        return child
      })}
    </div>
  )
})
Select.displayName = "Select"

const SelectTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    value?: string
  }
>(({ className, children, value, ...props }, ref) => {
  // Find the display value from children
  let displayValue = value
  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child) && child.type === SelectValue) {
      displayValue = child.props.children
    }
  })

  return (
    <button
      ref={ref}
      className={cn(
        "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
        className,
      )}
      {...props}
    >
      {displayValue || <span className="text-muted-foreground">Select an option</span>}
      <ChevronDown className="h-4 w-4 opacity-50" />
    </button>
  )
})
SelectTrigger.displayName = "SelectTrigger"

const SelectValue = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>
}
SelectValue.displayName = "SelectValue"

const SelectContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    onValueChange?: (value: string) => void
    value?: string
  }
>(({ className, children, onValueChange, value, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "relative z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md animate-in fade-in-80",
        "absolute w-full mt-1",
        className,
      )}
      {...props}
    >
      <div className="max-h-[--radix-select-content-available-height] overflow-y-auto">
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child) && child.type === SelectItem) {
            return React.cloneElement(child as React.ReactElement<any>, {
              onSelect: () => onValueChange?.(child.props.value),
              isSelected: child.props.value === value,
            })
          }
          return child
        })}
      </div>
    </div>
  )
})
SelectContent.displayName = "SelectContent"

const SelectItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    value: string
    onSelect?: () => void
    isSelected?: boolean
  }
>(({ className, children, onSelect, isSelected, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      isSelected && "bg-accent text-accent-foreground",
      className,
    )}
    onClick={onSelect}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      {isSelected && <Check className="h-4 w-4" />}
    </span>
    {children}
  </div>
))
SelectItem.displayName = "SelectItem"

const SelectGroup = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("p-1 text-foreground", className)} {...props} />,
)
SelectGroup.displayName = "SelectGroup"

export { Select, SelectGroup, SelectValue, SelectTrigger, SelectContent, SelectItem }

