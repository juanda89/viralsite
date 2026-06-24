# Assets pendientes — Viral Ideas landing

Deja los archivos en `site/public/media/` (o pásame los **links/URLs** por chat). Yo los conecto.

| # | Asset | Dónde va | Formato | Cómo entregarlo |
|---|-------|----------|---------|-----------------|
| 1 | **VSL del hero** ("how we work, 3 min") | `Hero.astro` | Embed URL (Wistia/Vimeo/YouTube/HighLevel) **o** `.mp4` + poster `.jpg` | URL por chat, o `media/hero-vsl.mp4` + `media/hero-poster.jpg` |
| 2 | **Logos de clientes** (logo wall) | `TrustStats.astro` | **SVG** monocromo/blanco (ideal) o PNG transparente | `media/logos/<marca>.svg` + dime los nombres |
| 3 | **Reels del portfolio** (5) | `Videos.astro` | Posters `.jpg` 9:16 + link/`.mp4` por reel | `media/reels/<n>.jpg` (+ URL de cada video) |
| 4 | **Fotos de testimonios** (opcional) | `Testimonials.astro` | Headshots `.jpg` cuadradas | `media/avatars/<nombre>.jpg` |
| 5 | **Calendario HighLevel** | `Booking.astro` (`#vi-calendar`) | **URL del embed** del calendario | URL por chat (mantengo el `id` para que el `fbclid` se anexe) |
| 6 | **Logo de marca** (reemplaza el wordmark) | `Nav.astro` / `Footer.astro` | SVG | `media/logo.svg` |
| 7 | **Favicon** | `public/favicon.svg` | SVG | reemplazar el actual |
| 8 | **Meta Pixel ID** | `Base.astro` `<head>` | el `PIXEL_ID` | por chat (agrego el código base del Pixel) |

> Nota: cada uno de estos puntos ya tiene un **placeholder funcional** con su comentario `TODO` en el código, así que la página se ve completa aunque falten. Al entregar, reemplazo el placeholder por el asset real.

## Lo que NO es asset (decisiones/integración, va aparte)
- Conectar el **form del calendario HighLevel** a los **custom fields de calificación** del quiz (budget/volumen/timeline) → para el filtro CAPI (`../MANUAL-META-ADS-LOW-CAC.md` §9).
- Dominio + deploy.
