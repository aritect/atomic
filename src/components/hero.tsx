import React from "react";

import { Button } from "@/components-ui-lib/button";
import { GradientText } from "@/components-ui-lib/gradient-text";
import { Link } from "@/components-ui-lib/link";
import { cn } from "@/utils-ui-lib/classnames";
import { SparklesIcon } from "@/icons-ui-lib/sparkles-icon";

const Hero = () => {
  return (
    <section className="container-docs">
      <div
        className={cn(
          "z-10 flex flex-col gap-y-4",
          "md:px-3",
          "lg:flex-row lg:justify-between lg:gap-x-12",
        )}
      >
        <h1
          className={cn(
            "max-w-[370px] shrink-0 text-3xl font-black",
            "sm:max-w-[410px] sm:text-3xl",
            "md:max-w-[410px] md:text-4xl",
            "lg:max-w-[550px] lg:text-5xl lg:mt-6",
            "xl:max-w-[600px] xl:text-5xl xl:mt-6",
          )}
        >
          <GradientText>
            Design system for building consistent, scalable interfaces.
          </GradientText>
        </h1>
        <div
          className={cn(
            "flex flex-col gap-y-8",
            "sm:gap-y-10",
            "md:mt-2 md:gap-y-8",
            "lg:mt-3 lg:gap-y-12",
          )}
        >
          <p
            className={cn(
              "text-muted-foreground",
              "font-sans max-w-[380px] leading-8",
              "sm:max-w-[480px] sm:text-lg sm:leading-8",
              "md:max-w-[480px] md:text-lg md:leading-8",
              "lg:max-w-[550px] lg:text-lg lg:leading-8",
              "xl:max-w-[640px] xl:text-2xl xl:leading-9",
            )}
          >
            A comprehensive design system powering the Aritect platform. Built with modern
            best practices and inspired by industry leaders like Radix, Tailwind, and Shadcn UI.
            Ship faster with production-ready components, accessible primitives, and battle-tested patterns.
          </p>
          <div className="flex space-x-4">
            <Button rounded="full" asChild>
              <Link href="/docs/introduction">Introduction</Link>
            </Button>
            <Button rounded="full" variant="ghost">
              <Link className="flex items-center" href="/docs/components/primitives/accordion">
                <SparklesIcon className="size-4 mr-1.5" />
                Components
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Hero };
