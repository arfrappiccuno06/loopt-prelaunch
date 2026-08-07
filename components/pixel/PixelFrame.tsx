import type { ReactNode } from "react";
import type { StyleProp, ViewStyle } from "react-native";
import { View } from "react-native";

import { PX } from "@/lib/theme";

export interface PixelFrameProps {
  children: ReactNode;
  /**
   * The bright notched border color. The four edges are inset by `weight`
   * from every corner, leaving open (notched) pixel corners. Pass
   * "transparent" to render a frameless box.
   */
  frameColor: string;
  /** Body background fill (sits behind the content, shows through the notches). */
  fillColor: string;
  /**
   * Drop-shadow color for the raised look. A darker rectangle peeks out the
   * bottom-right; on `pressed` the body sinks into it and the shadow hides.
   * Omit (or use `inset`) for a flat, recessed frame (inputs / selected).
   */
  shadowColor?: string;
  /** Flat framed box with no raised drop-shadow. */
  inset?: boolean;
  /** Raised → pressed. Only meaningful when a `shadowColor` is set. */
  pressed?: boolean;
  /** Frame thickness + shadow offset. Defaults to one pixel unit (4). */
  weight?: number;
  /** Stretch to the parent's width instead of shrink-wrapping content. */
  fullWidth?: boolean;
  /** Outer wrapper style (alignment, width, margins). */
  style?: StyleProp<ViewStyle>;
  /** Inner content style (padding, flex direction, alignment). */
  contentStyle?: StyleProp<ViewStyle>;
}

/**
 * The shared pixel-frame engine: a notched bright border over a dark fill,
 * with an optional offset drop-shadow for a physical raised/pressed feel.
 *
 * Built entirely from absolutely-positioned <View> layers (no borderRadius,
 * no borderWidth, no box-shadow) so it renders identically on iOS, Android,
 * and web via Expo's static export.
 *
 *   outer (reserves the shadow gutter via the body's margin)
 *   ├─ shadow   absolute, offset +weight,+weight, behind
 *   └─ body     in-flow (drives size), fill background
 *      ├─ 4 notched edge Views (frameColor)
 *      └─ content
 */
export function PixelFrame({
  children,
  frameColor,
  fillColor,
  shadowColor,
  inset = false,
  pressed = false,
  weight = PX,
  fullWidth = false,
  style,
  contentStyle,
}: PixelFrameProps) {
  const raised = !inset && !!shadowColor;
  // Reserve room bottom-right for the shadow so nothing overlaps neighbors.
  const gutter = raised ? weight : 0;
  const shift = raised && pressed ? weight : 0;

  const edge = (edgeStyle: ViewStyle) => (
    <View
      pointerEvents="none"
      style={{ position: "absolute", backgroundColor: frameColor, ...edgeStyle }}
    />
  );

  return (
    <View
      style={[
        {
          position: "relative",
          alignSelf: fullWidth ? "stretch" : "flex-start",
        },
        style,
      ]}
    >
      {raised ? (
        <View
          pointerEvents="none"
          style={{
            position: "absolute",
            top: weight,
            left: weight,
            right: 0,
            bottom: 0,
            backgroundColor: pressed ? "transparent" : shadowColor,
          }}
        />
      ) : null}

      <View
        style={{
          marginRight: gutter,
          marginBottom: gutter,
          backgroundColor: fillColor,
          transform: shift
            ? [{ translateX: shift }, { translateY: shift }]
            : undefined,
        }}
      >
        {frameColor !== "transparent" ? (
          <>
            {edge({ top: 0, left: weight, right: weight, height: weight })}
            {edge({ bottom: 0, left: weight, right: weight, height: weight })}
            {edge({ left: 0, top: weight, bottom: weight, width: weight })}
            {edge({ right: 0, top: weight, bottom: weight, width: weight })}
          </>
        ) : null}
        <View style={contentStyle}>{children}</View>
      </View>
    </View>
  );
}
