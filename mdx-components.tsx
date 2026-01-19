import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";
import { Callout } from "fumadocs-ui/components/callout";
import { Tab, Tabs } from "fumadocs-ui/components/tabs";
import { Steps, Step } from "fumadocs-ui/components/steps";
import { TypeTable } from "fumadocs-ui/components/type-table";
import { Cards, Card } from "fumadocs-ui/components/card";
import * as icons from "lucide-react";

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    Callout,
    Tab,
    Tabs,
    Steps,
    Step,
    TypeTable,
    Cards,
    Card,
    icons: icons as any,
    ...components,
  };
}
