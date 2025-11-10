import StraightIcon from "@/assets/design/straight.svg?react";
import WinderIcon from "@/assets/design/winder.svg?react";
import DoubleWinderIcon from "@/assets/design/doubleWinder.svg?react";
import type { DESIGNS } from "@/constants";
import { cn } from "@/lib/utils";

type Design = (typeof DESIGNS)[number];

const DESIGN_ICONS = {
  straight: StraightIcon,
  winder: WinderIcon,
  doubleWinder: DoubleWinderIcon,
} satisfies Record<Design, React.ComponentType<React.SVGProps<SVGSVGElement>>>;

export default function DesignIcon({
  design,
  className,
  ...rest
}: { design: Design } & React.SVGProps<SVGSVGElement>) {
  const Icon = DESIGN_ICONS[design];
  return <Icon className={cn("size-5", className)} {...rest} />;
}
