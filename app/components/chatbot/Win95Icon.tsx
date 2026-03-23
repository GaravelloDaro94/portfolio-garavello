import Image from "next/image";
import type { ReactNode } from "react";

interface Win95IconProps {
  readonly label: string;
  readonly iconSrc?: string;
  readonly children?: ReactNode;
}

export function Win95Icon({ label, iconSrc, children }: Readonly<Win95IconProps>) {
  return (
    <div className="flex w-20 flex-col items-center gap-1 text-center text-xs">
      <div className="grid h-12 w-12 place-items-center">
        {iconSrc ? (
          <Image
            src={iconSrc}
            alt={label}
            width={32}
            height={32}
            className="h-8 w-8 [image-rendering:pixelated]"
          />
        ) : (
          children
        )}
      </div>
      <span className="max-w-[80px] text-[13px] leading-4 [text-shadow:1px_1px_0_#000]">{label}</span>
    </div>
  );
}
