import { Redirect } from "expo-router";

/**
 * `/` is reserved for the future app home screen.
 *
 * Until the app ships, the root sends visitors to the pre-launch marketing
 * landing page. When you build the real home screen, replace this redirect
 * with it — the marketing pages keep living under app/(marketing)/.
 */
export default function Index() {
  return <Redirect href="/coming-soon" />;
}
