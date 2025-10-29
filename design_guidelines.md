# Mundo Tango AI Orchestration Platform - Design Guidelines

## Design Approach

**Selected Approach:** Design System (Fluent Design + Custom Data Visualization)

**Rationale:** Enterprise AI orchestration platform requiring robust data visualization, real-time monitoring, and complex hierarchical information architecture. Combines Fluent Design's enterprise-grade components with custom elements for agent visualization and multi-model routing displays.

**Core Principles:**
- Information density with clarity: Maximum data visibility without overwhelming users
- Hierarchical visual structure: Clear visual differentiation between CEO → Chiefs → Coordinators → Agents
- Real-time responsiveness: Immediate visual feedback for agent status changes
- Operational efficiency: Quick access to critical controls and metrics

---

## Typography System

**Primary Font:** Inter (via Google Fonts CDN)
- Display/Headers: 600-700 weight
- Body/Interface: 400-500 weight  
- Code/Technical: 400 weight, monospace fallback

**Type Scale:**
- Hero/Dashboard Title: text-4xl (36px) font-semibold
- Section Headers: text-2xl (24px) font-semibold
- Card/Panel Titles: text-lg (18px) font-medium
- Body Text: text-base (16px) font-normal
- Metrics/Labels: text-sm (14px) font-medium
- Agent IDs/Technical: text-xs (12px) font-mono

**Hierarchy Implementation:**
- Primary actions: font-semibold
- Secondary labels: font-medium
- Supporting text: font-normal
- Maintain 1.5-1.6 line height for readability in dense layouts

---

## Layout System

**Spacing Primitives:** Tailwind units of 2, 4, 6, 8, 12, 16, 24
- Micro spacing (between related elements): p-2, gap-2
- Standard component padding: p-4, p-6
- Card/panel padding: p-6, p-8
- Section spacing: py-12, py-16
- Major layout gaps: gap-6, gap-8

**Grid Structure:**
- Dashboard grid: 12-column system (grid-cols-12)
- Sidebar navigation: 256px fixed width
- Main content: Fluid with max-w-7xl container
- Card grids: 2-4 columns responsive (grid-cols-1 md:grid-cols-2 lg:grid-cols-3)

**Layout Zones:**
1. **Top Navigation Bar:** Fixed height-16, full-width, contains global controls
2. **Left Sidebar:** Fixed w-64, contains agent hierarchy navigation
3. **Main Dashboard:** Fluid, contains agent status grid and real-time feeds
4. **Right Panel (optional):** w-80, agent detail view on selection
5. **Bottom Status Bar:** Fixed height-12, system-wide metrics

---

## Component Library

### Navigation & Structure

**Primary Navigation Bar:**
- Fixed top positioning with backdrop blur
- Logo/brand left (h-8)
- Global search center (max-w-md)
- User profile + system status right
- Height: h-16, padding: px-6

**Hierarchical Sidebar:**
- Collapsible tree structure for 105+ agents
- Visual indentation: pl-4 per level (CEO → Chiefs → Coordinators → Agents)
- Agent status indicators: Small dot icons (h-2 w-2 rounded-full)
- Active state: Bold text + subtle background
- Smooth expand/collapse animations (transition-all duration-200)

### Agent Visualization

**Agent Status Cards:**
- Compact cards in grid layout: min-h-32
- Card structure:
  - Header: Agent ID + name + status indicator
  - Metrics row: Success rate | Response time | Current load
  - Progress bar: Visual load indicator (0-100%)
  - Footer: Last activity timestamp
- Rounded corners: rounded-lg
- Subtle borders with elevation on hover

**Hierarchical Tree Visualization:**
- SVG-based connection lines between agents
- Node size variation by hierarchy level:
  - CEO (Agent #0): Largest (w-16 h-16)
  - Chiefs: Large (w-12 h-12)
  - Coordinators: Medium (w-10 h-10)
  - Layer Agents: Standard (w-8 h-8)
- Expandable/collapsible branches
- Status-based node styling (active/idle/processing)

### Data Display Components

**Metrics Dashboard:**
- 4-column stat grid on desktop (grid-cols-4)
- Large numbers: text-3xl font-bold
- Metric labels: text-sm uppercase tracking-wide
- Trend indicators: Small arrows + percentage change
- Compact cards with px-6 py-4 padding

**Real-Time Activity Feed:**
- Reverse chronological list (max-h-96 overflow-y-auto)
- Timeline-style with vertical connector lines
- Entry structure:
  - Timestamp (text-xs)
  - Agent identifier (text-sm font-medium)
  - Action description (text-sm)
  - Status badge
- Sticky date headers
- Auto-scroll to new entries with notification

**Agent Communication Flow:**
- Horizontal swimlane diagram
- Message bubbles with directional arrows
- Color-coded by message type (task/data/status)
- Timestamps on hover
- Expandable message content

### Forms & Controls

**Agent Task Assignment:**
- Two-column layout: Agent selector left, task details right
- Agent dropdown with search/filter (Combobox pattern)
- Task priority selector (Radio group)
- Rich text area for task description
- Submit action: Primary button, full-width on mobile

**Filter Panels:**
- Collapsible sidebar filters
- Checkbox groups for multi-select (agent type, status, division)
- Range sliders for numeric filters (success rate, response time)
- Clear all + Apply buttons at bottom
- Active filter chips above results

### Modal & Overlays

**Agent Detail Modal:**
- Large centered modal (max-w-4xl)
- Three-tab layout: Overview | Performance | History
- Scrollable content area (max-h-96)
- Fixed footer with action buttons
- Backdrop blur effect

**Notification Toast:**
- Top-right positioning (fixed top-4 right-4)
- Stack multiple toasts vertically (space-y-2)
- Auto-dismiss after 5s with progress bar
- Icon + message + close button
- Slide-in animation from right

---

## Page Layouts

### Main Dashboard Layout
- Full viewport height (min-h-screen)
- Three-column structure:
  1. Sidebar (w-64): Agent hierarchy tree
  2. Center (flex-1): Agent status grid + metrics
  3. Right panel (w-80, toggleable): Selected agent details
- Top metrics banner: Full-width, h-24
- Activity feed: Bottom panel, h-64, collapsible

### Agent Orchestration View
- Split-screen layout (50/50)
- Left: Available agents (filterable list)
- Right: Active tasks (Kanban board style)
- Drag-and-drop between sections
- Floating action button for new task (bottom-right)

### Performance Analytics Dashboard
- Hero metrics: 4-card grid at top
- Time-series charts: Full-width, h-80 each
- Comparison table: Sortable, sticky header
- Export controls: Top-right fixed position

---

## Responsive Behavior

**Breakpoints:**
- Mobile: < 768px - Single column, collapsible sidebar, stacked cards
- Tablet: 768px - 1024px - Two-column grids, persistent sidebar
- Desktop: > 1024px - Full multi-column layouts, split views

**Mobile Adaptations:**
- Bottom navigation bar replaces sidebar
- Agent cards full-width
- Metrics stack vertically
- Modals become full-screen slides

---

## Interaction Patterns

**Agent Selection:**
- Click card → Highlight + show detail panel
- Double-click → Open full modal
- Hover → Elevate card with shadow transition

**Status Updates:**
- Real-time badge color changes (no page reload)
- Subtle pulse animation on status change
- Toast notification for critical events

**Load Balancing Visualization:**
- Animated progress bars showing agent capacity
- Queue depth indicators
- Drag-and-drop task reassignment

---

## Images

**Hero Section:** None - This is a dashboard application, not a marketing site. Lead directly with the agent status grid and metrics.

**Iconography:**
- Use Heroicons for all UI icons (outline style for secondary, solid for primary actions)
- Agent type icons: Custom SVG badges (consistent 24x24px size)
- Status indicators: Simple geometric shapes (dots, squares)

---

## Accessibility

- Focus indicators on all interactive elements (ring-2 ring-offset-2)
- ARIA labels for all icons and status indicators
- Keyboard navigation for tree views (arrow keys + enter)
- Screen reader announcements for real-time updates
- Sufficient contrast ratios for all text (WCAG AA minimum)