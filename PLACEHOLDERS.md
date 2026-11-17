# By Lado — aan te leveren door Quinty

Volledige lijst per pagina: `npm run check` → `QA-PLACEHOLDERS.tsv`.

## Blokkerend voor livegang
- [ ] **Welke methodes** ze aanbiedt → `offered: true/false` in `src/data/methods.ts` (nu staan alle 5 op noindex)
- [ ] Per methode: plaatsingstijd, gaat mee, onderhoud elke, herbruikbaar, zichtbaarheid, vanaf-prijs (haar eigen cijfers)
- [ ] **Prijslijst incl. btw** + prijsmodel (per gram/baan/lengte; haar inbegrepen?) → `PRICES` en `CALC`
- [ ] Consult: gratis of €X (verrekend?), duur
- [ ] **Contact**: telefoon, e-mail, WhatsApp-nummer, Instagram, TikTok, domein (nu `bylado.nl` als aanname), KVK, adres of “op afspraak”, openingstijden, parkeren
- [ ] Boekingssysteem (Salonized/Treatwell/Fresha-link) — leeg = eigen formulier
- [ ] **Echte voor/na-foto’s** (zelfde licht/hoek, geen filter) met methode · lengte · gram · haartype → `RESULTS`
- [ ] **Echte extensions-reviews** (naam, datum, methode) → `REVIEWS`; reviewscore + bron + link
- [ ] Haarkwaliteit/herkomst, certificaten per methode, verhaal op /over-quinty
- [ ] Voorwaarden (bestaande tekst), privacyverklaring nalezen

## Te bevestigen
- [ ] Advieslogica extension-check (`advise()` in `src/data/content.ts` is voorlopig, gebaseerd op algemene vakkennis)
- [ ] “Ideaal voor / voor wie niet” per methode en nazorgadviezen
- [ ] Kleurt/tont Quinty zelf? Doorlooptijd haar bestellen? Hergebruik bij onderhoud?
- [ ] Correcties van extensions van elders (`/extensions-herstellen` staat op noindex tot bevestiging)
- [ ] Onderhoud/verwijderen van extensions van elders
- [ ] “Vrijblijvend advies · Eerlijk over wat wel en niet kan” onder CTA’s
- [ ] Eerstvolgende plek (`SITE.nextSlot`), alleen als er echt een wachttijd is
- [ ] Extensions-gids (pdf) voor de e-mailpopup + nazorgkaarten per methode
- [ ] Google Bedrijfsprofiel voor By Lado

## Bewuste keuzes
- `--stone` is donkerder dan in de brief (#6B5F57 i.p.v. #7A6E66): het origineel haalt geen AA-contrast (4,45:1).
- Framer Motion vervangen door vanilla JS/CSS (zelfde easing, primitives en reduced-motion gedrag).
- Engels: 12 kernpagina’s; methodedetails, calculator, gidsen en Friesland alleen in het Nederlands.
