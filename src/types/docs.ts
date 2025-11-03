import type { CollectionEntry } from "astro:content";

import type { Icon } from "@/types-ui-lib";

export type DocsGroup = {
  id: string;
  href: string;
  label: string;
  Icon: Icon;
  hrefPrefix?: string;
};

export type DocsItem = {
  id: string;
  href: string;
  label: string;
  Icon?: Icon;
};

export type DocsTocItem = {
  id: string;
  text: string;
  type: "h2" | "h3";
};

export type DocsCollectionGroups = Record<string, CollectionEntry<"docs">[]>;

export type DocsCollectionGroupsMenuItems = Record<string, DocsItem[]>;
