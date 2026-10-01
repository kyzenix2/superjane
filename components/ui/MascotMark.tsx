import Image from "next/image";
import { cn } from "@/lib/utils";

export function MascotMark({
  className,
  priority = false,
  alt = "",
}: {
  className?: string;
  priority?: boolean;
  alt?: string;
}) {
  return (
    <span className={cn("relative block", className)}>
      <Image src="/mascot.png" alt={alt} fill priority={priority} sizes="280px" className="object-contain" />
    </span>
  );
}
