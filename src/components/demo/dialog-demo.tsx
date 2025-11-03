import React from "react";

import { Button } from "@/components-ui-lib/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components-ui-lib/dialog";
import { Input } from "@/components-ui-lib/input";
import { Label } from "@/components-ui-lib/label";

const DialogDemo = () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save afterwards.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-y-3 justify-start">
          <div className="grid grid-cols-4 items-center gap-x-4 gap-y-3">
            <Label htmlFor="name" className="text-left">
              Name
            </Label>
            <Input id="name" value="Pedro Duarte" className="col-span-3" />
            <Label htmlFor="username" className="text-left">
              Username
            </Label>
            <Input id="username" value="@peduarte" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
);

export { DialogDemo };
