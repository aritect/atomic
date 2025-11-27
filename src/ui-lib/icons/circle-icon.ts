import { createIconComponent } from "@/utils-ui-lib/create-icon-component";

const CircleIcon = createIconComponent("CircleIcon", {
  "solid.rounded": [["path", { d: "M1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12Z", fill: "currentColor", fillRule: "evenodd", key: "k0" }]],
  "solid.sharp": [["path", { d: "M1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12Z", fill: "currentColor", key: "k0" }]],
  "stroke.rounded": [
    [
      "circle", {
        cx: "12", cy: "12", r: "10", stroke: "currentColor", key: "k0",
      },
    ],
  ],
  "stroke.sharp": [
    [
      "circle", {
        cx: "12", cy: "12.0001", r: "10", stroke: "currentColor", key: "k0",
      },
    ],
  ],
});

export default CircleIcon;
