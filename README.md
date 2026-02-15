# Atomic

A modern, comprehensive design system built for [Aritect](https://aritect.com) — an advanced platform leveraging hybrid intelligence to transform investment strategies in decentralized finance.

Built with ❤️ by the Aritect team.

## Overview

Atomic is a production-ready React component library built with TypeScript, Tailwind CSS, and modern web technologies. It provides a complete set of accessible, customizable UI components designed for building scalable financial applications and data-intensive interfaces.

## Features

- **🎨 60+ Components** — From basic UI elements to complex data visualizations.
- **📊 Advanced Charts** — Built-in chart components for financial data visualization.
- **♿ Accessible** — WCAG compliant components with proper ARIA attributes.
- **🎯 Type-Safe** — Full TypeScript support with comprehensive type definitions.
- **🌗 Dark Mode** — Built-in dark mode support with seamless theme switching.
- **📱 Responsive** — Mobile-first design with responsive utilities.
- **🎭 Customizable** — Tailwind CSS-based styling for easy customization.
- **⚡ Performance** — Optimized bundle sizes with tree-shaking support.
- **🔧 Developer Experience** — Intuitive API with excellent IDE support.

## Installation

Install the package using your preferred package manager:

```sh
bun install @aritect/atomic
```

## Quick start

### Configure Tailwind CSS

Add the Atomic preset to your Tailwind configuration:

```ts
import preset from "@aritect/atomic/tailwind-preset";
import type { Config } from "tailwindcss";

export default {
  darkMode: ["selector"],
  content: [
    "./src/**/*.{html,ts,tsx}",
    "./node_modules/@aritect/atomic/target/**/*.js",
  ],
  presets: [preset],
} satisfies Config;
```

### Import styles

Import the base styles in your application entry point:

```ts
import "@aritect/atomic/scss";
```

### Use components

Import and use components in your application:

```tsx
import { Button } from "@aritect/atomic/components/button";
import { Card } from "@aritect/atomic/components/card";

export const App = () => (
  <Card>
    <Button variant="default">Button</Button>
  </Card>
);
```

## Component categories

### Layout & structure

- Box, Flex, Shell.
- Resizable, Separator.
- Sidebar, Sheet, Drawer.

### Forms & input

- Input, Textarea, Select.
- Checkbox, Radio Group, Switch.
- Slider, Input OTP.
- Form (with validation).

### Data display

- Table, Data Table (with sorting, filtering, pagination).
- Compact Table.
- Card, Badge, Avatar.
- Typography, Truncated Text.

### Charts & visualization

- Line Chart, Bar Chart, Pie Chart.
- KPI Card, Horizontal Segmented Chart.
- Trend indicators.

### Navigation

- Navigation Menu, Menubar.
- Breadcrumb, Pagination.
- Tabs, Accordion.

### Feedback

- Alert, Alert Dialog, Dialog.
- Toaster (toast notifications).
- Loader, Skeleton, Progress.
- Empty State.

### Overlay

- Popover, Tooltip, Hover Card.
- Dropdown Menu, Context Menu.
- Command (command palette).

### Effects & animation

- Background gradient animation.
- Cool mode, scramble.
- SVG Mask Effect.
- Text Hover Effect.

### Specialized

- Calendar, Carousel.
- Mode Toggle (theme switcher).
- Money Value (financial formatting).
- Dashboard View, Login View.

## License

The MIT License (MIT)

Copyright (c) 2026 Aritect

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
