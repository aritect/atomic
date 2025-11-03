import React, { type FC, type PropsWithChildren } from "react";

import { Image } from "@/components-ui-lib/image";
import { ModeToggle } from "@/components-ui-lib/mode-toggle";

interface LoginViewProps extends PropsWithChildren {
  formImage: string;
  formTitle: string;
  formDescription: string;
  logo: React.ReactNode;
  imageComponent?: React.ComponentType<React.ComponentPropsWithoutRef<"img">>;
}

const LoginView: FC<LoginViewProps> = ({
  logo,
  children,
  formTitle,
  formImage,
  formDescription,
  imageComponent: ImageComponent = Image,
}) => (
    <div className="relative grid h-[calc(100vh-3rem)] grid-cols-1 overflow-hidden md:grid-cols-3 lg:grid-cols-2">
      <div className="relative">
        <ImageComponent
          src={formImage}
          alt={formTitle}
          width="1920"
          height="1080"
          className="absolute hidden h-full w-full object-cover md:block"
        />
        <div className="from-background to-background/60 md:to-background/40 absolute inset-0 bg-gradient-to-t" />
        <div className="absolute left-8 top-8 z-20 flex items-center text-lg font-bold tracking-tight">
          {logo}
        </div>
      </div>
      <div className="absolute right-8 top-8 z-20">
        <ModeToggle />
      </div>
      <div className="container absolute top-1/2 col-span-1 flex -translate-y-1/2 items-center md:static md:top-0 md:col-span-2 md:flex md:translate-y-0 lg:col-span-1">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">{formTitle}</h1>
            <p className="text-muted-foreground text-balance">
              {formDescription}
            </p>
          </div>
          {children}
        </div>
      </div>
    </div>
);

LoginView.displayName = "LoginView";

export { LoginView };
