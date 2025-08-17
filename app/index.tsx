import { useEffect } from "react";
import { useRouter, useNavigationContainerRef } from "expo-router";

export default function IndexRedirect() {
  const router = useRouter();
  const navigationRef = useNavigationContainerRef();

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (navigationRef.isReady()) {
        router.replace("/home");
      }
    }, 0); // small delay to wait for router readiness

    return () => clearTimeout(timeout);
  }, []);

  return null;
}
