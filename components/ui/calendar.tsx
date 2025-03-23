"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isToday,
} from "date-fns"

export interface CalendarProps {
  mode?: "single" | "range" | "multiple"
  selected?: Date | Date[] | { from: Date; to: Date }
  onSelect?: (date: Date | Date[] | { from: Date; to: Date } | undefined) => void
  className?: string
  showOutsideDays?: boolean
  disabled?: (date: Date) => boolean
  initialFocus?: boolean
}

function Calendar({
  mode = "single",
  selected,
  onSelect,
  className,
  showOutsideDays = true,
  disabled,
  initialFocus,
}: CalendarProps) {
  const [month, setMonth] = React.useState(() => {
    if (selected) {
      if (Array.isArray(selected)) {
        return startOfMonth(selected[0] || new Date())
      } else if ("from" in selected) {
        return startOfMonth(selected.from || new Date())
      } else {
        return startOfMonth(selected || new Date())
      }
    }
    return startOfMonth(new Date())
  })

  const days = React.useMemo(() => {
    return eachDayOfInterval({
      start: startOfMonth(month),
      end: endOfMonth(month),
    })
  }, [month])

  const handlePreviousMonth = () => {
    setMonth((prev) => subMonths(prev, 1))
  }

  const handleNextMonth = () => {
    setMonth((prev) => addMonths(prev, 1))
  }

  const handleSelectDate = (day: Date) => {
    if (disabled?.(day)) return

    if (mode === "single") {
      onSelect?.(day)
    }
    // For simplicity, we're only implementing single mode fully
  }

  const isSelectedDate = (day: Date): boolean => {
    if (!selected) return false

    if (Array.isArray(selected)) {
      return selected.some((selectedDay) => isSameDay(selectedDay, day))
    } else if ("from" in selected) {
      if (selected.from && selected.to) {
        return day >= selected.from && day <= selected.to
      }
      return selected.from ? isSameDay(selected.from, day) : false
    } else {
      return isSameDay(selected, day)
    }
  }

  return (
    <div className={cn("p-3", className)}>
      <div className="flex justify-between items-center mb-4">
        <Button variant="outline" size="icon" onClick={handlePreviousMonth} className="h-7 w-7 bg-transparent p-0">
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Previous month</span>
        </Button>
        <div className="text-sm font-medium">{format(month, "MMMM yyyy")}</div>
        <Button variant="outline" size="icon" onClick={handleNextMonth} className="h-7 w-7 bg-transparent p-0">
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Next month</span>
        </Button>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
          <div key={i} className="text-center text-sm text-muted-foreground">
            {day}
          </div>
        ))}
        {Array.from({ length: new Date(month.getFullYear(), month.getMonth(), 1).getDay() }).map((_, i) => (
          <div key={`empty-${i}`} className="h-9" />
        ))}
        {days.map((day, i) => {
          const isSelected = isSelectedDate(day)
          const isDayToday = isToday(day)
          const isOutsideMonth = !isSameMonth(day, month)

          return (
            <Button
              key={day.toString()}
              variant="ghost"
              size="icon"
              className={cn(
                "h-9 w-9 p-0 font-normal",
                isSelected && "bg-primary text-primary-foreground",
                isDayToday && !isSelected && "bg-accent text-accent-foreground",
                isOutsideMonth && !showOutsideDays && "invisible",
                disabled?.(day) && "text-muted-foreground opacity-50 cursor-not-allowed",
              )}
              disabled={disabled?.(day)}
              onClick={() => handleSelectDate(day)}
            >
              {format(day, "d")}
            </Button>
          )
        })}
      </div>
    </div>
  )
}

export { Calendar }

