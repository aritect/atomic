import { AccordionDemo } from "@/components/demo/accordion-demo";
import { AlertDemo } from "@/components/demo/alert-demo";
import { AlertDialogDemo } from "@/components/demo/alert-dialog-demo";
import { BarChartPositiveDemo } from "@/components/demo/bar-chart-positive-demo";
import { DrawerDemo } from "@/components/demo/drawer-demo";
import { PaginationDemo } from "@/components/demo/pagination-demo";
import { PieChartDemo } from "@/components/demo/pie-chart-demo";
import { RadioGroupDemo } from "@/components/demo/radio-group-demo";
import { ResizableDemo } from "@/components/demo/resizable-demo";
import { SelectDemo } from "@/components/demo/select-demo";
import { SkeletonDemo } from "@/components/demo/skeleton-demo";
import { SwitchDemo } from "@/components/demo/switch-demo";
import { ToastDemo } from "@/components/demo/toast-demo";
import { ToggleGroupDemo } from "@/components/demo/toggle-group-demo";
import { AvatarBoringDemo } from "@/components/demo/avatar-boring-demo";

export const DEMO = [
  {
    id: "avatar",
    href: "/docs/components/primitives/avatar",
    Component: AvatarBoringDemo,
    type: "primitive",
  },
  {
    id: "bar-chart-simple",
    href: "/docs/components/charts/bar-chart",
    Component: BarChartPositiveDemo,
    type: "chart",
  },
  {
    id: "pie-chart",
    href: "/docs/components/charts/pie-chart",
    
    Component: PieChartDemo,
    type: "chart",
  },
  {
    id: "alert",
    href: "/docs/components/primitives/alert",
    Component: AlertDemo,
    type: "primitive",
  },
  {
    id: "resizable",
    href: "/docs/components/primitives/resizable",
    Component: ResizableDemo,
    type: "primitive",
  },
  {
    id: "drawer",
    href: "/docs/components/primitives/drawer",
    Component: DrawerDemo,
    type: "primitive",
  },
  {
    id: "toggle-group",
    href: "/docs/components/primitives/toggle-group",
    Component: ToggleGroupDemo,
    type: "primitive",
  },
  {
    id: "switch",
    href: "/docs/components/primitives/switch",
    Component: SwitchDemo,
    type: "primitive",
  },
  {
    id: "toast",
    href: "/docs/components/primitives/toast",
    Component: ToastDemo,
    type: "primitive",
  },
  {
    id: "accordion",
    href: "/docs/components/primitives/accordion",
    Component: AccordionDemo,
    type: "primitive",
  },
  {
    id: "skeleton",
    href: "/docs/components/primitives/skeleton",
    Component: SkeletonDemo,
    type: "primitive",
  },
  {
    id: "alert-dialog",
    href: "/docs/components/primitives/alert-dialog",
    Component: AlertDialogDemo,
    type: "primitive",
  },
  {
    id: "select",
    href: "/docs/components/primitives/select",
    Component: SelectDemo,
    type: "primitive",
  },
  {
    id: "radio-group",
    href: "/docs/components/primitives/radio-group",
    Component: RadioGroupDemo,
    type: "primitive",
  },
  {
    id: "pagination",
    href: "/docs/components/primitives/pagination",
    Component: PaginationDemo,
    type: "primitive",
  },
];
