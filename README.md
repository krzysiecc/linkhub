## 3. Co podmienić

Wszystko jest w jednym pliku: **`src/data/links.js`**

- `name`, `role`, `location` — Twoje dane,
- adresy w `links` (LinkedIn, Credly, GitHub) — pola oznaczone `// TODO`,
- sekcje **CV** i **E-mail** są zakomentowane na dole — odkomentuj, jeśli chcesz.
  (CV: wrzuć `CV.pdf` do folderu `public/`, wtedy `href: 'CV.pdf'` zadziała.)

## 4. Build

```bash
npm run build    # wynik trafia do folderu dist/
npm run preview  # podejrzyj build lokalnie
```

---

## 5. Wdrożenie na GitHub Pages (najprościej — paczka `gh-pages`)

1. Utwórz repozytorium na GitHubie, np. **`links`** (publiczne).
2. W folderze projektu:
   ```bash
   git init
   git add .
   git commit -m "link hub"
   git branch -M main
   git remote add origin https://github.com/TWOJ-LOGIN/links.git
   git push -u origin main
   ```
3. Opublikuj stronę jedną komendą (paczka `gh-pages` jest już w devDependencies):
   ```bash
   npm run deploy
   ```
   To zbuduje projekt i wypchnie folder `dist/` na gałąź **`gh-pages`**.
4. GitHub → **Settings → Pages** → _Source_: gałąź **`gh-pages`**, katalog **/(root)** → **Save**.
5. Po chwili strona żyje pod:
   `https://TWOJ-LOGIN.github.io/links/`
   — **ten adres** wstaw w CV (zamiast słowa „linktree").

> `base: './'` w `vite.config.js` sprawia, że działa to zarówno w podkatalogu
> (`/links/`), jak i w repo `TWOJ-LOGIN.github.io` (wtedy adres jest bez `/links/`).

### Alternatywa: GitHub Actions

Zamiast `npm run deploy` możesz w repo dodać workflow budujący na każdym pushu
(Settings → Pages → _Source: GitHub Actions_ podpowie gotowy szablon dla Vite).

### Własna domena (opcjonalnie)

W Settings → Pages → _Custom domain_ wpisz domenę i dodaj rekord CNAME u rejestratora.

---

## 6. Podkręcenie animacji — React Bits (Three.js / GSAP / Framer)

Strona ma już własne tło Three.js, ale możesz podmienić je na gotowca z
**React Bits** (https://reactbits.dev) — licencja MIT + Commons Clause, użycie
komercyjne OK.

Jak dodać komponent:

1. Wejdź na reactbits.dev, wybierz np. **tło**: _Aurora_, _Particles_, _Threads_,
   _Hyperspeed_, _Silk_; albo **tekst**: _SplitText_, _ShinyText_, _GradientText_.
2. Na stronie komponentu skopiuj gotową komendę. Dla tego projektu (JS + zwykły CSS)
   wybierz wariant **JS-CSS**, np.:
   ```bash
   npx shadcn@latest add https://reactbits.dev/r/Aurora-JS-CSS
   # lub:
   npx jsrepo add https://reactbits.dev/default/Backgrounds/Aurora
   ```
3. Doinstaluj zależności, których wymaga dany komponent (część używa `gsap`,
   `three` lub `ogl`) — komenda jest podana na jego stronie.
4. Zaimportuj go w `src/App.jsx` i wstaw zamiast `<Background />`, np.:
   ```jsx
   import Aurora from "./components/Aurora";
   // ...
   <Aurora /* propsy wg dokumentacji */ />;
   ```

---

## 7. Wariant awaryjny (bez instalacji)

Jeśli nie chcesz buildować, masz też **statyczny `index.html`** (z wcześniejszej
wiadomości) — wrzucasz jeden plik na GitHub Pages i działa od ręki, bez Node.
Wersja React jest ładniejsza (animacje), ale ta jest zero-konfiguracji.
