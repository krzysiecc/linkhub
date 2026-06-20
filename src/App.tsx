import Background from "./components/Background";
import Noise from "./components/Noise";
import Flashlight from "./components/Flashlight";
import TorchHint from "./components/TorchHint";
import Parallax from "./components/Parallax";
import ClickBlur from "./components/ClickBlur";
import LinkCard from "./components/LinkCard";
// import Marquee from "./components/Marquee";
import ResourceLinks from "./components/ResourceLinks";
import LangSwitcher from "./components/LangSwitcher";
import { profile, links } from "./data/links";
import { useI18n } from "./i18n";
import { useIsMobile } from "./useIsMobile";

export default function App() {
  const { t } = useI18n();
  const isMobile = useIsMobile();

  return (
    <ClickBlur>
      {/* Tlo (Three.js) i latarka tylko na desktopie; grain zawsze. */}
      {!isMobile && <Background />}
      <Noise patternAlpha={75} patternRefreshInterval={5} />
      {!isMobile && <Flashlight />}
      {!isMobile && <TorchHint />}

      <main className="relative z-2 mx-auto flex min-h-full w-full max-w-110 flex-col px-5.5 pt-14 pb-9">
        <Parallax className="flex flex-1 flex-col justify-center">
          <h1 className="name-grad text-left font-display text-[40px] font-bold tracking-[-3px]">
            {profile.name}
          </h1>
          <div className="mt-2.5 text-left font-body text-[12px] uppercase tracking-[4px] text-accent">
            {t("role")}
          </div>
          <div className="mt-1.75 text-left font-body text-[13.5px] text-muted">
            {t("location")}
          </div>

          <nav className="mt-8.5 flex flex-col gap-3.25">
            {links.map((l) => (
              <LinkCard key={l.id} {...l} />
            ))}
          </nav>

          {/* <Marquee /> */}
        </Parallax>

        <footer className="relative left-1/2 mt-auto w-[min(700px,92vw)] -translate-x-1/2 pt-7 text-center">
          <div className="mb-5.5 flex items-start gap-10.5 text-left max-[560px]:flex-col max-[560px]:gap-4">
            <ResourceLinks />
            <div className="ml-auto text-right max-[560px]:ml-0 max-[560px]:text-left">
              <LangSwitcher />
            </div>
          </div>
          <div className="mt-4 font-body text-[13px] text-muted">
            {new Date().getFullYear()} © {profile.name} — {t("footerSuffix")}
          </div>
        </footer>
      </main>
    </ClickBlur>
  );
}
