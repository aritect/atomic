import React, { type ReactElement, type ReactNode } from "react";

import type { MDXComponents } from "mdx/types";

import { Id } from "@/components/id";
import CodeBlock from "@/islands/code-block.astro";

import { textToHtmlId } from "./docs";

const components: MDXComponents = {
  h2: (props) => {
    const childElement = props.children as
      | ReactElement<{
          value?: ReactNode;
        }>
      | undefined;

    return (
      <h2 className="mb-5 mt-16 text-xl font-medium">
        <Id id={textToHtmlId(childElement?.props.value?.toString())} />
        {props.children}
      </h2>
    );
  },
  h3: (props) => {
    const childElement = props.children as
      | ReactElement<{
          value?: ReactNode;
        }>
      | undefined;

    return (
      <h3 className="mb-5 mt-8 text-lg font-medium">
        <Id id={textToHtmlId(childElement?.props.value?.toString())} />
        {props.children}
      </h3>
    );
  },
  p: (props) => (
    <p className="text-foreground mt-5 text-base leading-7" {...props} />
  ),
  code: (props) => (
    <code
      className="bg-accent text-foreground/70 nowrap -my-1 rounded-sm px-2 py-1 font-mono"
      {...props}
    />
  ),
  pre: CodeBlock,
  a: (props) => (props.href?.startsWith("/") ? (
      <a
        href={props.href}
        className="text-muted-foreground underline underline-offset-[5px]"
        {...props}
      />
  ) : (
      <a
        className="text-muted-foreground underline underline-offset-[5px]"
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      />
  )),
  ul: (props) => (
    <ul
      className="mt-5 flex list-inside list-disc flex-col gap-y-1"
      {...props}
    />
  ),
};

export { components };
