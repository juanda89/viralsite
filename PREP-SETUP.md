# Post-booking flow: booking → /prep form → same contact

**Flow:** Landing CTA → `#book` (HighLevel calendar) → user books (creates the contact) →
HighLevel redirects to **`/prep`** → user answers the form → answers saved to the **same contact** (matched by email).

The landing no longer has the quiz inline. The questions live on `/prep`.

## 1. Make the calendar redirect to /prep (HighLevel)
HighLevel → **Calendars → your calendar → Edit → Confirmation** tab:
- **On booking → Redirect to URL** = `https://YOUR-DOMAIN/prep`
- If your calendar/funnel lets you append merge fields, use:
  `https://YOUR-DOMAIN/prep?email={{contact.email}}&name={{contact.first_name}}&contact_id={{contact.id}}`
  → `/prep` prefills the email so the user doesn't retype it.
- If merge fields aren't available, no problem: `/prep` asks for the email (the one they just booked with), which is what links the answers back to the contact.

> Note: when the calendar is embedded in an iframe, the redirect happens inside the widget. If you want it to break out to the full page, use HighLevel's redirect setting (it navigates the top window), or host the calendar on its own `/book` step.

## 2. Receive the answers on the booked contact (HighLevel Inbound Webhook)
1. HighLevel → **Automation → Workflows → + Create → Inbound Webhook** trigger. Copy the **webhook URL**.
2. Paste it into `src/pages/prep.astro` → `const GHL_WEBHOOK = '...'`.
3. The form POSTs JSON like:
   ```json
   { "email": "jane@co.com", "name": "Jane", "contact_id": "...",
     "bottleneck": "freelancers", "volume": "v2", "budget": "b3",
     "role": "founder", "content": "mix", "timeline": "asap",
     "readiness": "yes", "qualified": true, "source": "prep-form" }
   ```
   Because `email` is included, HighLevel matches the **existing contact** from the booking (upsert by email).
4. In the workflow, add **Update Contact Field** actions mapping each key to a **custom field**:
   - Create the custom fields first (Settings → Custom Fields): `bottleneck`, `monthly_video_volume`, `monthly_budget`, `role`, `content_focus`, `timeline`, `footage_readiness`, `qualified_lead`.
   - Map webhook value → custom field.
5. (CAPI) Add an **If/Else** on `qualified = true` (or budget/volume/timeline) → fire the **Facebook Conversions API** `Schedule` event only for qualified leads. See `MANUAL-META-ADS-LOW-CAC.md` §9.

## 3. fbclid still flows
`tracking.js` appends `fbclid`/utm to the calendar iframe, so Meta attribution is on the contact from booking. The `/prep` answers then qualify it for the CAPI event.
