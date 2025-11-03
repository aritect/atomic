import React, { type FC } from "react";

import { Scramble } from "@/components-ui-lib/scramble";


const ScrambleDemo: FC = () => {
  return (
    <div className="flex space-x-6">
      <Scramble className="font-mono text-sm">Inscryption</Scramble>
      <Scramble className="font-mono text-sm">Scrambling</Scramble>
    </div>
  );
};

export { ScrambleDemo };
