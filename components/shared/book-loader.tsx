
import { Skeleton } from "@/components/ui/skeleton"
function BookLoader() {
  return (
    <div className="flex flex-col gap-1.5">
      <Skeleton className="h-40 w-full rounded-sm" />
      <Skeleton className="h-5 w-[50%] rounded-full" />
    </div>
  )
}

export default BookLoader