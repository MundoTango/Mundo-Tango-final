# Mundo Tango AI Platform - Design Guidelines

## Design Philosophy

**Mission Control Aesthetic** for enterprise AI orchestration managing 112 concurrent agents.

**Core Principles:**
- Maximum information density with instant comprehension
- Sub-second agent state assessment via visual hierarchy
- CEO → Chiefs → Coordinators → Agents structure always visible
- Real-time updates without disrupting user flow

---

## Typography

**Font:** Inter (Google Fonts CDN)

**Scale:**
```
Dashboard Title: text-5xl font-bold
Section Headers: text-2xl font-semibold
Agent Group Headers: text-xl font-semibold
Card Titles/Body: text-base font-medium
Large Metrics: text-4xl font-bold
Standard Metrics: text-lg font-semibold
Labels: text-sm font-medium
Agent IDs/Technical: text-xs font-mono
Micro-labels: text-xs font-normal
```

**Hierarchy:**
- Critical data (capacity, errors, load): font-bold
- Primary labels (headers, active tasks): font-semibold
- Secondary info (names, timestamps): font-medium
- Technical data (IDs, logs): font-mono

---

## Layout System

**Spacing:** Tailwind units 1, 2, 3, 4, 6, 8
- Status indicators/badges: gap-1, p-1
- Metric cards/agent tiles: p-2, gap-2
- Standard components: p-3/p-4, gap-3
- Panels: p-4/p-6
- Sections: py-6/py-8

**Grid Architecture:**
- Header: Fixed h-14
- Sidebar: w-72 (collapsible to w-16)
- Main grid: 16-column system
- Agent tiles: grid-cols-6 lg:grid-cols-8
- Analytics: grid-cols-4

**Mission Control Zones:**
1. **Command Bar** (h-14): Global controls, system status, emergency stop
2. **Hierarchy Navigator** (w-72): 112-agent tree, independent scroll
3. **Central Monitor** (flex-1): Agent grid (default) | Network graph | Heatmap
4. **Live Feed** (w-80): Real-time activity, auto-scroll
5. **Metrics Banner** (h-20): 6 critical KPIs, always visible

---

## Components

### Command Bar
```
Position: sticky top-0 z-50
Layout: 3-zone flex
- Left: Logo + breadcrumb (gap-4)
- Center: Search + filters (max-w-2xl)
- Right: Health indicators + user (gap-3)
Backdrop: blur enabled
```

### Agent Navigator
```
Structure:
- CEO (#0): pl-2, text-base font-bold
- Chiefs (5): pl-6, text-sm font-semibold
- Coordinators (20): pl-10, text-sm font-medium
- Layer Agents (86): pl-14, text-xs font-normal

Features:
- Status dots: w-2 h-2 rounded-full mr-2
- Icons: Heroicons chevron (h-4 w-4)
- Active: Bold + elevated bg
- Scroll: overflow-y-auto max-h-[calc(100vh-3.5rem)]
```

### Dense Agent Grid
```html
<div class="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
  <div class="min-h-24 rounded-md p-3 hover:scale-105 transition">
    <!-- Header -->
    <div class="flex justify-between items-start">
      <span class="text-xs font-mono">Agent ID</span>
      <div class="w-2 h-2 rounded-full"></div> <!-- Status -->
    </div>
    <!-- Name -->
    <p class="text-sm font-medium truncate">Agent Name</p>
    <!-- Mini metrics -->
    <div class="flex gap-2 text-xs">
      <span>Icon + %</span> <!-- Success rate -->
      <span>Icon + ms</span> <!-- Response time -->
      <span>Icon + %</span> <!-- Load -->
    </div>
    <!-- Progress -->
    <div class="h-1.5 w-full rounded-full"></div>
  </div>
</div>
```

### Metrics Banner
```html
<div class="h-20 grid grid-cols-6 gap-6 px-8">
  <div>
    <p class="text-3xl font-bold">[Number]</p>
    <p class="text-xs uppercase tracking-wider">[Label]</p>
    <div class="flex items-center text-xs">
      <span>Arrow + %</span> <!-- Trend -->
    </div>
    <div class="h-8 w-full">[Sparkline]</div>
  </div>
  <!-- Repeat 6x -->
</div>
```

### Agent Detail Panel
```
Slide-in: w-96 h-full from right
Tabs: Overview | Metrics | Tasks | History
Sections (gap-4):
- Identity: p-4 agent details
- Live metrics: grid-cols-2 grid-rows-3
- Task queue: max-h-64 scrollable
- Charts: Sparklines h-16 each
Close: absolute top-4 right-4
```

### Activity Feed
```html
<div class="max-h-[calc(100vh-3.5rem)] overflow-y-auto">
  <div class="py-2 px-3 border-l-2">
    <span class="text-xs absolute top-2 right-2">[Time]</span>
    <span class="text-xs font-mono px-2 py-1 rounded">[Agent]</span>
    <p class="text-sm line-clamp-2">[Action]</p>
    <icon class="h-4 w-4">[Status]</icon>
  </div>
  <!-- Auto-scroll, pause on hover -->
</div>
```

### Task Assignment Modal
```html
<div class="max-w-3xl grid grid-cols-2 gap-6">
  <!-- Left: Agent selector -->
  <div>
    <input type="search" />
    <div class="space-y-2">
      <!-- Agent cards with capacity bars -->
    </div>
  </div>
  <!-- Right: Task form -->
  <div class="space-y-4">
    <div>Priority (radio horizontal)</div>
    <div>Task type (dropdown)</div>
    <div>Parameters (key-value pairs)</div>
    <div>Schedule (date/time picker)</div>
  </div>
  <div class="col-span-2 flex justify-end gap-2">
    <button>Cancel</button>
    <button>Assign</button>
  </div>
</div>
```

### Critical Alert Modal
```html
<div class="max-w-2xl">
  <icon class="h-16 w-16"></icon>
  <h2 class="text-xl font-bold">[Alert Type]</h2>
  <ul>[Affected Agents]</ul>
  <p class="text-base">[Impact]</p>
  <ul>[Recommended Actions]</ul>
  <div class="flex gap-2">
    <button>Emergency Stop</button>
    <button>Investigate</button>
    <button>Dismiss</button>
  </div>
</div>
```

### Toast Notifications
```
Position: fixed top-4 right-4 z-50
Stack: space-y-2 vertical
Toast: p-4 rounded-lg min-w-80
- Icon + title (flex gap-3)
- Message (text-sm, max 2 lines)
- Progress bar (h-1, auto-dismiss)
Animation: slide-in from right (duration-300)
```

---

## Page Layouts

### Main Dashboard
```html
<div class="h-screen overflow-hidden">
  <!-- Top -->
  <div class="h-14">[Command Bar]</div>
  <div class="h-20">[Metrics Banner]</div>
  
  <div class="flex flex-1">
    <!-- Left -->
    <aside class="w-72">[Agent Navigator]</aside>
    
    <!-- Center -->
    <main class="flex-1">
      [Agent Grid | Network Graph | Heatmap]
    </main>
    
    <!-- Right -->
    <aside class="w-80">[Activity Feed]</aside>
  </div>
</div>
```

### Task Orchestration
```html
<div class="grid grid-cols-2 gap-4 h-full">
  <!-- Left: Available agents -->
  <div>
    <input type="search" />
    <div>[Filters]</div>
    <div>[Draggable Agent Cards]</div>
  </div>
  
  <!-- Right: Task board -->
  <div class="grid grid-cols-3 gap-4">
    <div>[Queued Column]</div>
    <div>[Running Column]</div>
    <div>[Complete Column]</div>
  </div>
</div>
```

### Analytics Dashboard
```html
<div class="py-8 px-6">
  <!-- Hero metrics -->
  <div class="grid grid-cols-4 gap-6 mb-8">
    <div>
      <p class="text-5xl font-bold">[Number]</p>
      <p>[Comparison]</p>
      <div>[Sparkline]</div>
    </div>
    <!-- Repeat 4x -->
  </div>
  
  <!-- Charts -->
  <div class="space-y-8">
    <div class="h-96">[Time-series Chart]</div>
    <div class="grid grid-cols-2 gap-6">
      <div>[Distribution Chart]</div>
      <div>[Distribution Chart]</div>
    </div>
  </div>
</div>
```

---

## Responsive Design

**Breakpoints:**
- Mobile (<768px): Single column, bottom nav, grid-cols-2
- Tablet (768-1024px): Collapsible sidebar, grid-cols-4
- Desktop (>1024px): Full layout, grid-cols-8
- Ultra-wide (>1920px): Expanded grids

**Mobile Adaptations:**
- Bottom tab bar: Agent grid | Tasks | Analytics
- Hamburger menu for hierarchy
- Full-width agent cards
- Metrics: grid-cols-2 grid-rows-3
- Activity feed: Full-screen modal

---

## Accessibility

**Focus:** `ring-2 ring-offset-1` on all interactive elements

**Keyboard Navigation:**
- Arrow keys: Tree/grid movement
- Enter/Space: Activate
- Escape: Close modals
- Tab: Standard flow

**ARIA:** Label all icons, status indicators, live regions

**Contrast:** WCAG AA minimum

**Motion:** Respect `prefers-reduced-motion`

---

## Icons & Visual Elements

**Library:** Heroicons (outline primary, solid for active)

**Sizing:**
- Action icons: 20x20px
- Inline metrics: 16x16px
- Status dots: w-2 h-2
- Agent hierarchy: Chevrons h-4 w-4

**Status Shapes:** Circles, squares, triangles for agent states