const BASE_URL = "http://localhost:3000/api/v1";
const MOBILE_BASE_URL = "http://192.168.29.4:3000/api/v1";

export default function getURL() {
  const isDesktop: boolean = navigator.userAgent.startsWith(
    "Mozilla/5.0 (Windows"
  );
  const URL = isDesktop ? BASE_URL : MOBILE_BASE_URL;

  return URL;
}
