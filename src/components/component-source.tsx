import React, { type FC } from "react";

import { CodeBlock } from "./code-block";

interface ComponentSourceProps {
  code: string;
}

const ComponentSource: FC<ComponentSourceProps> = ({ code }) => (
  <CodeBlock language="tsx" className="mt-5">
    {code}
  </CodeBlock>
);

export { ComponentSource };
