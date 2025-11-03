import React from "react";

import { Button } from "@/components-ui-lib/button";
import { Input } from "@/components-ui-lib/input";
import { Label } from "@/components-ui-lib/label";
import {
  Sheet,
  SheetClosePrimitive,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components-ui-lib/sheet";

const SheetDemo = () => (
    <Sheet>
      <SheetTrigger>
        <Button variant="outline">Open Sheet</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-y-6">
          <div>
            <Label htmlFor="name">
              Name
            </Label>
            <Input id="name" value="Pedro Duarte" className="mt-2" />
          </div>
          <div>
            <Label htmlFor="username">
              Username
            </Label>
            <Input id="username" value="@peduarte" className="mt-2" />
          </div>
        </div>
        <SheetFooter>
          <SheetClosePrimitive asChild>
            <Button type="submit">Save Changes</Button>
          </SheetClosePrimitive>
        </SheetFooter>
      </SheetContent>
    </Sheet>
);

export { SheetDemo };
