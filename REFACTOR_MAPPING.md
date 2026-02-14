# CSS Refactoring Mapping

## Goal
Reorganize existing working CSS files into clean modular structure.

## Source Files (OLD)
- css/style.css (815 lines)
- css/enhancements.css
- css/mobile.css
- css/nav.css
- css/mobile-nav.css
- css/animated-architecture.css
- css/timeline.css
- css/memory-graph.css
- css/playground.css

## Target Files (NEW)
- css/base.css
- css/components.css
- css/layout.css
- css/sections.css
- css/animations.css
- css/responsive.css
- css/view-transitions.css (keep as is)

---

## Mapping: What Goes Where

### base.css
**Purpose:** Variables, resets, body, global styles

**Extract from style.css:**
- Lines 1-65: Cursor glow effect + body styles
- Lines 25-44: :root variables
- Lines 45-65: body background gradients
- Lines 66-84: Scroll progress indicator

**Extract from other files:**
- Any :root variables
- Any * {} resets
- Any body {} styles

---

### components.css
**Purpose:** Reusable components (cards, badges, buttons, icons)

**Extract from style.css:**
- Card styles (if any)
- Badge styles
- Button styles
- Icon styles

**Extract from enhancements.css:**
- Card enhancements
- Badge styles
- Button effects

**Extract from other files:**
- .card, .badge, .button classes
- .icon, .logo classes

---

### layout.css
**Purpose:** Layout structures (hero, sections, containers, grids)

**Extract from style.css:**
- Lines 85-121: Hero section layout
- Lines 122-372: Morphing blobs
- Container styles
- Grid layouts
- Section spacing

**Extract from nav.css:**
- All navigation layout

**Extract from mobile-nav.css:**
- Mobile navigation layout

---

### sections.css
**Purpose:** Section-specific styles

**Extract from style.css:**
- Lines 373-508: About section
- Lines 509-572: Capabilities section
- Lines 573-622: Philosophy section
- Lines 623-696: Tech stack section
- Lines 697-713: Footer

**Extract from animated-architecture.css:**
- All architecture section styles

**Extract from timeline.css:**
- All timeline section styles

**Extract from memory-graph.css:**
- All memory graph section styles

**Extract from playground.css:**
- All playground section styles

---

### animations.css
**Purpose:** All animations, transitions, keyframes

**Extract from style.css:**
- Lines 714-785: Animations section

**Extract from enhancements.css:**
- Animation enhancements

**Extract from all other files:**
- @keyframes rules
- transition properties
- animation properties

---

### responsive.css
**Purpose:** All media queries

**Extract from style.css:**
- Lines 786-815: Responsive section

**Extract from mobile.css:**
- All mobile styles

**Extract from all other files:**
- All @media queries

---

## Haiku Agent Tasks

### Agent 1: base.css
- Read: style.css (lines 1-84), enhancements.css, mobile.css
- Extract: Variables, resets, body, cursor, scroll progress
- Write: css/base-new.css

### Agent 2: components.css
- Read: style.css, enhancements.css
- Extract: Cards, badges, buttons, icons
- Write: css/components-new.css

### Agent 3: layout.css
- Read: style.css (lines 85-372), nav.css, mobile-nav.css
- Extract: Hero, blobs, containers, grids, navigation
- Write: css/layout-new.css

### Agent 4: sections.css (part 1)
- Read: style.css (lines 373-713), animated-architecture.css
- Extract: About, capabilities, philosophy, tech-stack, footer, architecture
- Write: css/sections-part1.css

### Agent 5: sections.css (part 2)
- Read: timeline.css, memory-graph.css, playground.css
- Extract: Timeline, memory-graph, playground sections
- Write: css/sections-part2.css

### Agent 6: animations.css
- Read: All CSS files
- Extract: All @keyframes, animations, transitions
- Write: css/animations-new.css

### Agent 7: responsive.css
- Read: All CSS files
- Extract: All @media queries
- Write: css/responsive-new.css

---

## Final Steps (Sonnet)

1. Merge sections-part1.css + sections-part2.css → sections.css
2. Validate all new CSS files
3. Update index.html to reference new files only
4. Test on local server
5. Deploy to GitHub Pages

---

## Success Criteria

- ✅ All styles preserved
- ✅ No visual regressions
- ✅ Clean modular structure
- ✅ 7 CSS files instead of 10+
- ✅ Easy to maintain and extend
