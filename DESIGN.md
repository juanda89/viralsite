# DESIGN.md — Viral Ideas Landing

> Sistema de diseño ejecutable. Claude Code lo lee cada sesión. Tokens viven en `src/styles/global.css` (`@theme`).
> Origen: eleva el Figma (ver `../01-AUDIT-FIGMA.md`) sin perder identidad. Manual: `../MANUAL-LANDING-HIGH-CONVERSION.md`.

## 0. Design read & dials
Redesign-**overhaul** de una landing book-a-call para **marketing leaders** en healthcare/ecommerce/agency/B2B. Lenguaje **dark-tech premium**. Stack **Astro + Tailwind v4**.
`DESIGN_VARIANCE 8 · MOTION 6 · DENSITY 4`. **Theme lock: dark. Accent lock: violet `#696CFC`.**

## 1. Atmósfera
Oscuro con **profundidad**, no plano. Glows violeta radiales en capas + grid sutil enmascarado + grain fijo (`.grain`, 3.5% opacity). Nunca `#000`/`#fff` puros.

## 2. Color (roles + rationale)
| Token | Hex | Uso |
|---|---|---|
| `canvas` | `#0B0A12` | fondo de página. Único. |
| `surface` | `#141320` | card / elevación 1. **Contrasta con canvas** (arregla el plano del Figma donde `#191833`≈`#0C0E19`). |
| `surface2` | `#1D1B2D` | elevación 2 / hover. |
| `line` | `#29263F` | hairlines, bordes. Agrupar con líneas/espacio antes que cards. |
| `ink` | `#F5F4FB` | texto principal. |
| `muted` | `#A5A2C4` | texto secundario. |
| `faint` | `#6F6C8F` | labels, terciario. |
| `violet` | `#696CFC` | **acento único, bloqueado.** CTAs y énfasis. |
| `violet-bright` | `#9092FF` | énfasis sobre oscuro (texto "system", iconos). |
| `violet-deep` | `#5A5DDD` | fondo de gradiente CTA (baja luminancia → contraste AA en texto grande). |

Regla: 1 solo acento en toda la página. Gradientes violeta solo con intención (CTA, glow). Nada de gradiente morado genérico de relleno.

## 3. Tipografía
- **Display:** `Sora Variable` (`font-display`) — headlines, números. Pesos 700/800, `tracking-tight`, `leading-[1.04]`.
- **Body:** `Manrope Variable` (`font-body`) — texto, labels. Body `text-lg leading-relaxed`, párrafo ≤ ~65ch.
- Escala con contraste fuerte (H1 ~66px vs body 18px). Reemplaza Rubik+Poppins del Figma por un par más distintivo manteniendo el aire geométrico.
- Saltos de tamaño 3x+, no 1.5x.

## 4. Componentes
- **Botón primario (CTA):** pill, `bg-gradient-to-b from-violet to-violet-deep`, texto blanco **≥17px semibold** (large-text → pasa AA 3:1), sombra violeta tinted, `active:translate-y-px`. Mismo CTA repetido: "Book your free call".
- **Botón/owner secundario:** ghost con `border-line`, icono play en círculo.
- **Card:** `bg-surface border border-line rounded-[20px]`, sombra tinted (nunca negra pura). Usar card solo si la elevación comunica jerarquía; si no, agrupar con `border`/espacio.
- **Radius lock:** cards 20px (`--radius-card`), controles pill, inputs ~12px. No mezclar fuera de esa regla.
- **Inputs (quiz/form):** label arriba, error abajo, nunca placeholder-as-label.

## 5. Layout & spacing
- Container `max-w-[1240px] mx-auto px-5 sm:px-8`.
- Secciones `py-20 lg:py-28` (DENSITY 4). Hero `min-h` no forzado; usa `100dvh` si full-height.
- **Variedad de layout (≥4 familias distintas en la página):** hero split asimétrico, stats en grid hairline, PAS en bento, dream en split invertido, how-it-works en steps verticales/horizontal, testimonios en marquee/columnas, quiz full-width. **Ninguna familia se repite.**
- Nav 1 línea, ≤64px. **Strip nav** (solo logo + CTA) en la LP de ads.
- Mobile: todo colapsa a 1 columna `px-5`.

## 6. Profundidad & elevación
canvas → surface → surface2. Sombras tinted al violeta/negro-azulado, nunca `#000` puro. Glows con `blur-2xl` detrás de elementos clave (VSL, CTAs). 1 ancla visual por sección.

## 7. Motion (MOTION 6)
- Page-load del hero: staggered (`.vi-load` + `animation-delay`).
- Scroll reveal vía **IntersectionObserver** (`[data-reveal]`, `[data-reveal-delay]`) — NUNCA `window.scroll` listener.
- Contadores animan on-view (`[data-count]`).
- Transiciones 150-250ms, easing `cubic-bezier(0.16,1,0.3,1)`. Animar solo `transform`/`opacity`.
- **Todo gated por `prefers-reduced-motion`.**

## 8. Do / Don't (anti-slop)
- ❌ **EM-DASH (`—`/`–`) prohibido en todo** (headlines, body, quotes, attribution). Usar coma, punto, dos puntos o guion `-`. (Regla dura.)
- ❌ Violeta-sobre-oscuro genérico de relleno, hero centrado, 3 cards iguales, fake dashboards, pills sobre imágenes, eyebrows numéricos ("01 / how it works"), scroll cues, status dots decorativos, version stamps, locale/time strips.
- ❌ Cards dentro de cards. Texto a nivel "profesional" (escribir simple).
- ✅ Asimetría, contraste de tipografía, profundidad real, prueba junto a cada CTA, copy del Figma (es fuerte) refinado.
- ✅ Imágenes reales (gen/Picsum seed con TODO), logos SVG reales (placeholder monograma + TODO), iconos de `ph` (astro-icon).

## 9. Conversión / tracking
- Conversión = **Book your free call**. Quiz de 7 preguntas califica → rutea a calendario HighLevel (`#book`).
- `src/lib/tracking.js`: captura **fbclid/utm/_fbp/_fbc** first-touch → propaga a `a[data-book]` y al iframe `#vi-calendar`. Crítico para el filtro CAPI (`../MANUAL-META-ADS-LOW-CAC.md` §9). Meta Pixel base → `<head>` de `Base.astro` (TODO).

## Pendiente de assets (reemplazar placeholders)
- VSL real del hero (Wistia/Vimeo/HighLevel) en `Hero.astro`.
- Logos reales de clientes en `TrustStats.astro`.
- Reels del portfolio (S7), fotos de testimonios (S8).
- Embed real del calendario HighLevel (S10).
