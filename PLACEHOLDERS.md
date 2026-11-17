# Nog aan te leveren / te checken met Quinty

Alles hieronder staat op de site als gele `[PLACEHOLDER]` of als gestreept fotovlak. Volledige lijst per pagina: `npm run check` → `QA-PLACEHOLDERS.tsv`.

## Moet vóór livegang
- [ ] **Google-reviews**: exacte tekst, voornaam, datum, plaats bruiloft, dienst → `src/data/reviews.ts`. Markeer de 37°C-review met `featured: 'heat'` en de Italië-review met `featured: 'italy'`. Daarna vullen carrousel, review-wall, snippets boven formulieren en contextuele reviews per regio zich vanzelf.
- [ ] **Google-profiel-URL + reviewlink** → `SITE.googleProfileUrl`, `SITE.googleReviewUrl`; review-aantal → `SITE.rating.count`.
- [ ] **Vanaf-prijzen** bruidskapsel en bruidsvisagie → `PRICES.bruidskapsel`, `PRICES.bruidsvisagie` (calculator, tarieven, dienstpagina’s en prijsgids nemen ze automatisch over).
- [ ] **Btw**: zijn de prijzen incl. btw, of valt Quinty onder de KOR? Daarna de [CHECK]-teksten op /tarieven weghalen.
- [ ] **KVK-nummer** → `SITE.kvk` (wettelijk verplicht op de site).
- [ ] **Studioadres** openbaar of niet → `SITE.streetAddress`/`postalCode` (schema, footer, contact en Leeuwarden-pagina passen zich aan).
- [ ] **Foto’s**: hero, portret Quinty, portfolio (per regio/locatietype), voor/na alleen met toestemming. Portfoliobijschriften moeten bij echte foto’s horen.
- [ ] **Algemene voorwaarden** (bestaande tekst plakken) en **privacyverklaring** laten nalezen (bewaartermijnen, verwerkers).

## Inhoud die Quinty zelf moet schrijven of bevestigen
- [ ] Verhaal op /over-mij, MUAH-omschrijving + certificaatbeeld, hygiëne-details, merken (alleen als ze dat wil).
- [ ] Uitgelichte verhalen (Italië-weekend, 37°C-bruiloft) + haar notitie over de opbouw van de look.
- [ ] Echte trouwlocaties waar ze werkte (trouwlocatiepagina’s noemen nu bewust geen namen).
- [ ] Plaatsen die ze echt bedient in Drenthe, Overijssel (Giethoorn?) en Noord-Holland; Texel ja/nee.
- [ ] Duur van de proefsessie; losse proefsessie mogelijk + prijs; betaaltermijn restbedrag; inhoud styling guide.
- [ ] Marktranges + methode op de prijsgids (of de kolom weglaten).
- [ ] Vier gidsen (/gidsen/…) staan als brief op noindex; na goedkeuring tekst invullen en `ready: true` zetten.

## Bewuste keuzes (afwijkend van de Lovable-prompts)
- Astro (statisch) i.p.v. een Lovable/React SPA, zodat elke pagina volledige HTML levert.
- Motion in vanilla JS + CSS i.p.v. Framer Motion (zelfde easing, primitives en reduced-motion gedrag; geen React-bundle). Lenis alleen op desktop.
- Preloader alleen op desktop bij eerste bezoek (LCP op mobiel).
- Reviewfilters verschijnen pas vanaf 12 reviews (met 8 geven filters lege resultaten).
- Engelse versie: alle hoofdpagina’s (15). Regio-, locatie- en gidspagina’s zijn alleen NL (Nederlandse zoekintentie); hreflang staat alleen op echte paren.
- Kaart op /bruidsstylist-nederland is een schematische tegelkaart, geen exacte provinciegrenzen.
- Regiopagina’s: ±1.000–1.300 woorden eigen tekst (QA telt 1.300–1.570 incl. navigatie); Leeuwarden en Noord-Holland zitten aan de korte kant tot Quinty plaatsen/locaties aanvult.
- Homepage-title (73 tekens) en -description (168) zijn letterlijk volgens de brief; Google kort ze in de zoekresultaten af.
