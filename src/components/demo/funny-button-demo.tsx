import React from "react";

import { AiSearchIcon } from "@/icons-ui-lib/ai-search-icon";
import { NanoTechnologyIcon } from "@/icons-ui-lib/nano-technology-icon";

import { FunnyButton } from "@/components-ui-lib/funny-button";

const FunnyButtonDemo = () => <FunnyButton><AiSearchIcon className="w-4 h-4 mr-2" />AI Search</FunnyButton>;

const FunnyButtonIconDemo = () => <FunnyButton size="icon"><NanoTechnologyIcon className="w-4 h-4" /></FunnyButton>;

const FunnyButtonLargeDemo = () => <FunnyButton size="lg"><AiSearchIcon className="w-4 h-4 mr-2" />Large</FunnyButton>;

const FunnyButtonSmallDemo = () => <FunnyButton size="sm"><AiSearchIcon className="w-4 h-4 mr-2" />Small</FunnyButton>;

const FunnyButtonExtraLargeDemo = () => <FunnyButton size="xl"><AiSearchIcon className="w-4 h-4 mr-2" />Extra Large</FunnyButton>;

export { FunnyButtonDemo, FunnyButtonIconDemo, FunnyButtonLargeDemo, FunnyButtonSmallDemo, FunnyButtonExtraLargeDemo };
