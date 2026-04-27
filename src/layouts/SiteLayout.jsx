import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import bg from "../assets/bg.png";
import ScrollProgress from "../components/ScrollProgress";
import Overlay from "../components/Overlay";

export default function SiteLayout() {
  const { pathname } = useLocation();

  useEffect(() => {
    AOS.init({
      duration: 900,
      easing: "ease-out-cubic",
      once: true,
      offset: 80,
    });
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    AOS.refreshHard();
  }, [pathname]);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-black text-white">
      <div
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat md:bg-fixed"
        style={{
          backgroundImage: `url(${bg})`,
          transform: "scale(1.02)",
        }}
      />
      <ScrollProgress />
      <Overlay />
      <div key={pathname} className="relative z-10">
        <Outlet />
      </div>
    </div>
  );
}
