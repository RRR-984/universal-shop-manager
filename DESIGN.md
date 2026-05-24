# Design Brief

## Direction

Universal Shop System — global POS and inventory system for shopkeepers in all countries. Clean, utilitarian interface that works on mobile, tablet, and desktop.

## Tone

Brutalist productivity inspired by Linear and Vercel. Every pixel serves a function. No decoration, maximum clarity, utilitarian trust.

## Differentiation

Deep blue primary (#1e40af) paired with green success and red alerts creates immediate, intuitive feedback. Mobile-first with 44px+ touch targets for shopkeepers using phones in emerging markets.

## Color Palette

| Token        | OKLCH            | Role                              |
|--------------|------------------|-----------------------------------|
| background   | 0.98 0.008 230   | Clean white, cool undertone       |
| foreground   | 0.18 0.015 230   | Deep charcoal, maximum readability |
| card         | 1.0 0.004 230    | Pure white for card surfaces      |
| primary      | 0.42 0.18 260    | Deep blue, trust & action         |
| accent       | 0.57 0.16 140    | Green, profit & success           |
| destructive  | 0.55 0.22 25     | Red, alerts & negative states     |
| muted        | 0.94 0.01 230    | Subtle backgrounds                |
| border       | 0.9 0.008 230    | Thin dividers                     |

## Typography

- Display: Space Grotesk — bold, modern, clean headings and hero text
- Body: DM Sans — neutral, highly readable, global market optimized
- Mono: Geist Mono — IMEI, serial numbers, technical identifiers
- Scale: hero `text-5xl md:text-7xl font-bold`, h2 `text-3xl font-bold`, label `text-sm font-semibold uppercase`, body `text-base leading-6`

## Elevation & Depth

Cards use subtle shadows (0 1px 3px for card, 0 4px 12px for elevated surfaces) with 8px border-radius. Borders define boundaries, not depth. No gradients or glow effects—flat, direct, trust-based.

## Structural Zones

| Zone      | Background              | Border             | Notes                                          |
|-----------|-------------------------|--------------------|------------------------------------------------|
| Header    | bg-card with border-b   | border-border      | Fixed, always visible, contains logo/title    |
| Nav       | bg-card (mobile bottom) | border-t (mobile)  | 5 icons ≥44px, desktop sidebar on left        |
| Content   | bg-background           | —                  | Alternates card/muted backgrounds per section |
| Cards     | bg-card shadow-sm       | border-border      | Consistent 8px radius, used for all widgets   |
| Footer    | Integrated into nav     | —                  | No separate footer; content flows to nav      |

## Spacing & Rhythm

16px base spacing unit. Sections separated by 24px gaps. Card padding 16px. Form inputs 12px vertical, 16px horizontal. Mobile-first: 16px page margins, desktop 24px. Generous breathing room for touch interaction.

## Component Patterns

- Buttons: primary (bg-primary, text-primary-foreground), secondary (bg-secondary), destructive (bg-destructive). All 44px min-height, 12px border-radius, font-medium. Hover opacity-90, active scale-95.
- Cards: bg-card, border border-border, rounded-lg, shadow-sm. Padding 16px. Used for all dashboard widgets.
- Badges: pill-shaped (rounded-full), semantic colors (accent for tags, destructive for alerts).
- Lists: clean rows, 16px padding, border-b separator except last item.
- Forms: input 12px v-padding, 16px h-padding, focus ring-primary ring-2. Labels uppercase sm text-muted-foreground.

## Motion

- Entrance: fade-in 0.3s, slide-up 0.3s on card/modal appearance
- Hover: opacity-90 on buttons, scale-95 on active press (tactile feedback)
- Transitions: all 0.2s cubic-bezier(0.4, 0, 0.2, 1) on state changes (no bounces)
- Decorative: minimal (only accordion expand/collapse, no ambient animations)

## Constraints

- No gradients, glow effects, or decorative blur
- All interactive elements ≥44px for mobile accessibility
- High contrast: AA+ WCAG on all text
- RTL-ready: flexbox row-reverse capable, no hard-coded directional text
- Mobile-first CSS with sm: md: lg: breakpoints
- Dark mode ready: CSS variables support light/dark token swapping

## Bill Sharing Feature

**BillShareCard Component** — 5 horizontal share buttons (WhatsApp, PDF, Email, Print, Link) in responsive grid. Mobile: 2-column, Tablet: 3-4 column, Desktop: 5-column layout. All buttons ≥44px touch targets with icon+label stacked vertically. Default state: transparent border, hover background shifts to muted (0.94 0.01 230), active scale-95. Email modal: centered, max-width 448px, form with email input + cancel/send buttons. Link share: copy-to-clipboard with success feedback (green checkmark, "Copied!" label, 2s auto-revert). Public bill view route (`/bill/:billId`): card-based bill display, back button, shop header, customer details, items table, totals, print button. All elements follow existing typography (DM Sans body, Space Grotesk display) and spacing (16px base unit). Print-friendly HTML generation for PDF download and thermal/A4 printing. Dark mode colors swap via CSS variables.

## Bill Sharing Feature

**BillShareCard Component** — 5 horizontal share buttons (WhatsApp, PDF, Email, Print, Link) in responsive grid. Mobile: 2-column, Tablet: 3-4 column, Desktop: 5-column layout. All buttons ≥44px touch targets with icon+label stacked vertically. Default state: transparent border, hover background shifts to muted (0.94 0.01 230), active scale-95. Email modal: centered, max-width 448px, form with email input + cancel/send buttons. Link share: copy-to-clipboard with success feedback (green checkmark, "Copied!" label, 2s auto-revert). Public bill view route (`/bill/:billId`): card-based bill display, back button, shop header, customer details, items table, totals, print button. All elements follow existing typography (DM Sans body, Space Grotesk display) and spacing (16px base unit). Print-friendly HTML generation for PDF download and thermal/A4 printing. Dark mode colors swap via CSS variables.

## Signature Detail

Blue primary with instant visual hierarchy through card elevation, subtle borders, and semantic color coding (green profit, red alert). The combination of clean typography, generous spacing, and utilitarian card-based layout creates immediate trust and efficiency for global shopkeepers. Bill sharing reinforces trust: customers can immediately access bills via 5 methods without friction. Bill sharing reinforces trust: customers can immediately access bills via 5 methods without friction.
