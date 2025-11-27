import React, { type FC } from "react";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components-ui-lib/tabs";
import { COMPONENT_PREVIEWS } from "@/constants/component-previews";
import { cn } from "@/utils-ui-lib/classnames";

import { CodeBlock } from "./code-block";

interface ComponentPreviewProps {
  id: keyof typeof COMPONENT_PREVIEWS;
  code: string;
}

const ComponentPreview: FC<ComponentPreviewProps> = ({ code, id }) => {
  const tabsTriggerStyles = cn(
    "rounded-none border-b border-b-transparent px-4 py-3",
    "data-[state=active]:border-b-foreground data-[state=active]:bg-transparent data-[state=active]:text-foreground",
  );

  const { PreviewComponent } = COMPONENT_PREVIEWS[id];

  return (
    <Tabs
      defaultValue="preview"
      className="mt-4 overflow-visible border"
    >
      <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
        <TabsTrigger value="preview" className={tabsTriggerStyles}>
          Preview
        </TabsTrigger>
        <TabsTrigger value="code" className={tabsTriggerStyles}>
          Code
        </TabsTrigger>
      </TabsList>
      <TabsContent value="preview" className="mt-0">
        <div className="flex min-h-[280px] items-center justify-center p-4 md:min-h-[430px] md:p-8">
          <PreviewComponent />
        </div>
      </TabsContent>
      <TabsContent value="code" className="mt-0">
        <CodeBlock language="tsx" className="rounded-t-none border-none">
          {code}
        </CodeBlock>
      </TabsContent>
    </Tabs>
  );
};

export { ComponentPreview };
