import React from "react";

import { Button } from "@/components-ui-lib/button";
import { CoolMode } from "@/components-ui-lib/cool-mode";

const CoolModeParticleDemo = () => (
  <CoolMode options={{ particle: "/bored-ape.jpg" }}>
    <Button>Click Me!</Button>
  </CoolMode>
);

export { CoolModeParticleDemo };
