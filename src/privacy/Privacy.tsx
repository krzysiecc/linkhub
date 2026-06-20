import { profile } from "../data/links";

// privacy page: the same statement in 3 languages, stacked, left-aligned to the
// main page's left margin (same max-w-110 + px-5.5 container as App).
interface Section {
  lang: string;
  back: string;
  title: string;
  body: string;
}

const SECTIONS: Section[] = [
  {
    lang: "pl",
    back: "powrót",
    title: "Polityka prywatności",
    body: "Ta strona należy do mnie i nie interesuje się Tobą. Nie ma tu analityki, reklam ani ciasteczek. Jedyne, co zostaje, to wybór języka zapisany lokalnie w Twojej przeglądarce - nie trafia nigdzie dalej. Czcionki ładują się z Google Fonts, a linki prowadzą do serwisów zewnętrznych (LinkedIn, Credly, GitHub, Google Drive), które rządzą się własnymi zasadami. To wszystko - miłego korzystania!",
  },
  {
    lang: "en",
    back: "back",
    title: "Privacy Policy",
    body: "This site belongs to me and takes no interest in you. No analytics, no ads, no tracking cookies. The only thing kept is your language choice, saved locally in your browser - it goes nowhere else. Fonts load from Google Fonts, and the links point to external services (LinkedIn, Credly, GitHub, Google Drive) that have their own rules. That's all - happy browsing!",
  },
  {
    lang: "de",
    back: "zurück",
    title: "Datenschutz",
    body: "Diese Seite gehört mir und interessiert sich nicht für dich. Keine Analyse, keine Werbung, keine Cookies. Das Einzige, was bleibt, ist deine Sprachwahl, lokal in deinem Browser gespeichert - sie geht nirgendwo sonst hin. Schriften werden von Google Fonts geladen, und die Links führen zu externen Diensten (LinkedIn, Credly, GitHub, Google Drive) mit eigenen Regeln. Das war's - ein schönes Surfen!",
  },
];

export default function Privacy() {
  return (
    <main className="relative z-2 mx-auto flex min-h-full w-full max-w-110 flex-col px-5.5 pt-14 pb-9">
      <a
        href="../"
        className="font-mono text-[12px] tracking-[0.5px] text-muted no-underline transition-colors hover:text-accent-2 focus-visible:text-accent-2"
      >
        {SECTIONS.map((s) => s.back).join(" · ")}
      </a>

      <div className="mt-12 flex flex-col gap-11">
        {SECTIONS.map((s) => (
          <section key={s.lang} lang={s.lang}>
            <div className="font-mono text-[10.5px] uppercase tracking-[4px] text-accent">
              {s.lang}
            </div>
            <h1 className="mt-2.5 font-display text-[22px] font-bold tracking-[-0.5px] text-text">
              {s.title}
            </h1>
            <p className="mt-3 max-w-100 font-mono text-[12.5px] leading-[1.75] text-muted">
              {s.body}
            </p>
          </section>
        ))}
      </div>

      <footer className="mt-14 font-body text-[13px] text-muted">
        {new Date().getFullYear()} © {profile.name}
      </footer>
    </main>
  );
}
