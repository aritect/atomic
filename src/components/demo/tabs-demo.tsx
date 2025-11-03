import React from "react";

import { Button } from "@/components-ui-lib/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components-ui-lib/card";
import { Input } from "@/components-ui-lib/input";
import { Label } from "@/components-ui-lib/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components-ui-lib/tabs";

const TabsDemo = () => (
  <Tabs defaultValue="account" className="w-[400px]">
    <TabsList className="grid w-full grid-cols-2 mb-4">
      <TabsTrigger value="account">Account</TabsTrigger>
      <TabsTrigger value="password">Password</TabsTrigger>
    </TabsList>
    <TabsContent value="account">
      <Card>
        <CardHeader className="mb-4">
          <CardTitle>Account</CardTitle>
          <CardDescription>
            Make changes to your account here. Click save when you&apos;re
            done.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-y-3">
          <div className="flex flex-col gap-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" defaultValue="Pedro Duarte" />
          </div>
          <div className="flex flex-col gap-y-1.5">
            <Label htmlFor="username">Username</Label>
            <Input id="username" defaultValue="@peduarte" />
          </div>
        </CardContent>
        <CardFooter>
          <Button>Save changes</Button>
        </CardFooter>
      </Card>
    </TabsContent>
    <TabsContent value="password">
      <Card>
        <CardHeader className="mb-4">
          <CardTitle>Password</CardTitle>
          <CardDescription>
            Change your password here. After saving, you&apos;ll be logged
            out.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-y-3">
          <div className="flex flex-col gap-y-2">
            <Label htmlFor="current">Current password</Label>
            <Input id="current" type="password" />
          </div>
          <div className="flex flex-col gap-y-1.5">
            <Label htmlFor="new">New password</Label>
            <Input id="new" type="password" />
          </div>
        </CardContent>
        <CardFooter>
          <Button>Save password</Button>
        </CardFooter>
      </Card>
    </TabsContent>
  </Tabs>
);

const TabsRoundedFullDemo = () => (
  <Tabs defaultValue="account" className="w-[400px]">
    <TabsList variant="roundedFull" className="grid w-full grid-cols-2 mb-4">
      <TabsTrigger value="account" variant="roundedFull">Account</TabsTrigger>
      <TabsTrigger value="password" variant="roundedFull">Password</TabsTrigger>
    </TabsList>
    <TabsContent value="account">
      <Card>
        <CardHeader className="mb-4">
          <CardTitle>Account</CardTitle>
          <CardDescription>
            Make changes to your account here. Click save when you&apos;re
            done.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-y-3">
          <div className="flex flex-col gap-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" defaultValue="Pedro Duarte" />
          </div>
          <div className="flex flex-col gap-y-1.5">
            <Label htmlFor="username">Username</Label>
            <Input id="username" defaultValue="@peduarte" />
          </div>
        </CardContent>
        <CardFooter>
          <Button>Save changes</Button>
        </CardFooter>
      </Card>
    </TabsContent>
    <TabsContent value="password">
      <Card>
        <CardHeader className="mb-4">
          <CardTitle>Password</CardTitle>
          <CardDescription>
            Change your password here. After saving, you&apos;ll be logged
            out.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-y-3">
          <div className="flex flex-col gap-y-2">
            <Label htmlFor="current">Current password</Label>
            <Input id="current" type="password" />
          </div>
          <div className="flex flex-col gap-y-1.5">
            <Label htmlFor="new">New password</Label>
            <Input id="new" type="password" />
          </div>
        </CardContent>
        <CardFooter>
          <Button>Save password</Button>
        </CardFooter>
      </Card>
    </TabsContent>
  </Tabs>
);

export { TabsRoundedFullDemo, TabsDemo };
