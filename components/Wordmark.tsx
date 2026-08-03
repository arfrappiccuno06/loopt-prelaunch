import { Text } from "react-native";

type WordmarkProps = {
  /** Size / color utilities from the caller (e.g. "text-6xl text-text"). */
  className?: string;
};

/** The Loopt wordmark — Space Grotesk, tight tracking, modern. Caller sets
 *  size and color via className. */
export function Wordmark({ className }: WordmarkProps) {
  return (
    <Text className={`font-display tracking-tight text-text ${className ?? ""}`}>
      Loopt
    </Text>
  );
}
