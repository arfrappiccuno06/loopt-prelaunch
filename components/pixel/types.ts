import type { PixelSize, PixelTone } from "@/lib/theme";

export type { PixelSize, PixelTone };

/** Props shared across the interactive pixel components. */
export interface PixelBaseProps {
  /** Accent tone. Defaults to "cyan". */
  tone?: PixelTone;
  /** Size on the 4px grid. Defaults to "md". */
  size?: PixelSize;
  /** Dim + block interaction. */
  disabled?: boolean;
}

/** Per-size metrics — all multiples of the 4px pixel grid. */
export interface SizeMetrics {
  /** Horizontal content padding. */
  padX: number;
  /** Vertical content padding. */
  padY: number;
  /** Label font size. */
  font: number;
  /** Icon box size. */
  icon: number;
  /** Minimum tappable height. */
  minH: number;
  /** Gap between icon and label. */
  gap: number;
}

export const SIZE_METRICS: Record<PixelSize, SizeMetrics> = {
  sm: { padX: 12, padY: 8, font: 13, icon: 14, minH: 36, gap: 8 },
  md: { padX: 16, padY: 12, font: 15, icon: 16, minH: 48, gap: 8 },
  lg: { padX: 20, padY: 16, font: 18, icon: 20, minH: 56, gap: 12 },
};
