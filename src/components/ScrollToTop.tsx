import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// React Router (in BrowserRouter mode) doesn't reset scroll position on
// navigation — switching between product pages (Home/Shruti/Messenger) via
// the nav links left the new page scrolled to wherever the previous page
// happened to be, instead of starting fresh from its hero section.
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
