import { cn } from "@/lib/utils"

interface TruncatedTextProps {
  text: string
  lines?: 1 | 2 | 3 | 4
  className?: string
}

export function TruncatedText({ text, lines = 1, className }: TruncatedTextProps) {
  const truncateClass = `truncate-${lines}`

  return <div className={cn(truncateClass, className)}>{text}</div>
}
