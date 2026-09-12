# Responsive and Accessibility Specification

## Breakpoints

Use Tailwind defaults.

### Mobile < 640
- single-column
- bottom nav or compact menu
- cards instead of wide tables
- dialogs become sheets
- 16px page padding
- buttons remain at least 40–44px tap height

### Tablet 640–1024
- 1–2 columns
- sidebar may collapse

### Desktop > 1024
- persistent sidebar
- analytics grids
- resume editor + match panel

## Kanban mobile

Horizontal scroll is acceptable.

Each lane:
- fixed min width around 280px
- lane header remains visible

Do not squeeze five columns to unreadable width.

## Tables mobile

Do not horizontally compress every column.

Switch to cards.

## Forms mobile

- one column
- full-width inputs
- sticky bottom action row acceptable

## Keyboard

All:
- buttons
- links
- status controls
- filters
- dialogs
must be keyboard reachable.

## Focus

Use visible focus ring.
Never disable outline without replacement.

## Labels

Every input has programmatic label.

Placeholder is not a label.

## Color

No status communicated only by color.

Example:
bad: orange dot only
good: `Interview` chip with orange styling

## Contrast

Use shadcn/Tailwind default accessible contrast.
Avoid gray-on-gray low contrast.

## Icon buttons

Need:
- tooltip or visible context
- `aria-label`

## Dialogs

- title
- description where destructive
- Escape closes non-destructive dialog
- focus trapped by component library

## Screen reader basics

- page uses one H1
- section headings are ordered
- form errors linked where practical
- decorative icons hidden if redundant

## Motion

Respect reduced motion automatically where component library supports it.
