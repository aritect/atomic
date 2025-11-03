import type { CollectionEntry } from "astro:content";

import {
  type DocsCollectionGroups,
  type DocsCollectionGroupsMenuItems,
  type DocsTocItem,
} from "@/types/docs";

export const textToHtmlId = (text?: string) => {
  if (typeof text !== "string") {
    return "id";
  }

  if (!text.trim()) {
    return "id";
  }

  return text
    .trim()
    .replace(/\s+/g, " ")
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
};

export const extractSectionIds = (content: string) => {
  const lines = content.split("\n");
  const ids: DocsTocItem[] = [];

  for (const line of lines) {
    if (line.startsWith("## ")) {
      const text = line.substring(3);
      const id = textToHtmlId(text);
      ids.push({ type: "h2", text, id });
    } else if (line.startsWith("### ")) {
      const text = line.substring(4);
      const id = textToHtmlId(text);
      ids.push({ type: "h3", text, id });
    }
  }

  return ids;
};

export const transformCollectionsToGroups = (collection: CollectionEntry<"docs">[],): DocsCollectionGroups =>
  collection.reduce<DocsCollectionGroups>((result, document) => {
    const group = document.id.split("/").slice(0, -1).join("/");
    if (!result[group]) {
      return { ...result, [group]: [document] };
    }

    result[group].push(document);

    return result;
  }, {},
);

export const transformCollectionGroupsToMenuItems = (groups: DocsCollectionGroups,) => Object.entries(groups).reduce(
  (result, [group, documents]) => {
    const items = documents.map((document) => ({
      id: document.id,
      href: `/docs/${document.id}`,
      label: document.data.title,
    }));

    const groupName = {
      "components/primitives": "primitivesMenuItems",
      "components/composites": "compositesMenuItems",
      "components/charts": "chartsMenuItems",
    }[group] as string;

    return {
      ...result,
      [groupName]: items,
    };
  },
    {
      primitivesMenuItems: [],
      compositesMenuItems: [],
      chartsMenuItems: [],
    } as DocsCollectionGroupsMenuItems,
);
