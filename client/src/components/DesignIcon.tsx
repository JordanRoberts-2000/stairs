import StraightIcon from "@/assets/design/straight.svg?react";
import WinderIcon from "@/assets/design/winder.svg?react";
import DoubleWinderIcon from "@/assets/design/doubleWinder.svg?react";
import type { DESIGNS } from "@/constants";
import { cn } from "@/lib/utils";

type Design = (typeof DESIGNS)[number];
type Variant = "default" | "outline";

const DESIGN_ICONS = {
  straight: StraightIcon,
  winder: WinderIcon,
  doubleWinder: DoubleWinderIcon,
} satisfies Record<Design, React.ComponentType<React.SVGProps<SVGSVGElement>>>;

type Props = {
  design: Design;
  variant?: Variant;
  blurBackground?: boolean;
  wrapperClassName?: string;
} & React.SVGProps<SVGSVGElement>;

export default function DesignIcon({
  design,
  variant = "default",
  blurBackground = true,
  className,
  wrapperClassName,
  ...rest
}: Props) {
  const Icon = DESIGN_ICONS[design];
  const isOutline = variant === "outline";

  return (
    <span
      className={cn(
        "relative inline-flex items-center justify-center",
        wrapperClassName,
      )}
    >
      {/* Blurry circle behind (default variant only) */}
      {blurBackground && (
        <>
          <span
            aria-hidden="true"
            className="absolute size-[50%] rounded-full bg-yellow-500/80 blur-md"
          />
          <span
            aria-hidden="true"
            className="absolute size-[40%] rounded-full bg-purple-200/80"
          />
        </>
      )}

      {/* Actual icon */}
      <Icon
        className={cn(
          "relative size-6 [&>path]:transition-colors",
          isOutline
            ? "[&>path]:fill-none [&>path]:stroke-current"
            : "[&>path]:fill-current [&>path]:stroke-current",
          className,
        )}
        {...rest}
        strokeWidth={isOutline ? 32 : 1}
      />
    </span>
  );
}
