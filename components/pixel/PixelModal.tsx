import type { ReactNode } from "react";
import { useId } from "react";
import { Modal, Pressable, StyleSheet, View } from "react-native";
import Svg, { Defs, Pattern, Rect } from "react-native-svg";

import { colors, PX } from "@/lib/theme";

import { PixelCard } from "./PixelCard";
import type { PixelTone } from "./types";

export interface PixelModalProps {
  visible: boolean;
  onRequestClose: () => void;
  /** Optional title bar on the card. */
  title?: string;
  /** Tone for the card title bar / frame. Defaults to "cyan". */
  tone?: PixelTone;
  /** Max width of the centered card. Defaults to 420. */
  maxWidth?: number;
  children: ReactNode;
}

/**
 * Full-screen overlay with a dithered checkerboard backdrop (not a blur — blur
 * fights the pixel art) and a centered PixelCard. Tapping the backdrop closes.
 */
export function PixelModal({
  visible,
  onRequestClose,
  title,
  tone = "cyan",
  maxWidth = 420,
  children,
}: PixelModalProps) {
  const patternId = `pxcheck-${useId()}`;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onRequestClose}
    >
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", padding: 24 }}>
        {/* Dithered backdrop — tap to dismiss. */}
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Close"
          onPress={onRequestClose}
          style={StyleSheet.absoluteFill}
        >
          <Svg width="100%" height="100%">
            <Defs>
              <Pattern
                id={patternId}
                width={PX * 2}
                height={PX * 2}
                patternUnits="userSpaceOnUse"
              >
                <Rect x={0} y={0} width={PX * 2} height={PX * 2} fill={colors.bg} fillOpacity={0.9} />
                <Rect x={0} y={0} width={PX} height={PX} fill="#000000" fillOpacity={0.6} />
                <Rect x={PX} y={PX} width={PX} height={PX} fill="#000000" fillOpacity={0.6} />
              </Pattern>
            </Defs>
            <Rect x={0} y={0} width="100%" height="100%" fill={`url(#${patternId})`} />
          </Svg>
        </Pressable>

        {/* Card sits above the backdrop; taps on it don't dismiss. */}
        <View style={{ width: "100%", maxWidth }}>
          <PixelCard title={title} tone={tone} raised>
            {children}
          </PixelCard>
        </View>
      </View>
    </Modal>
  );
}
