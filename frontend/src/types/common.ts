import type { LucideIcon } from "lucide-react";

export type AsyncViewState = "Normal" | "Loading" | "Empty" | "Error";

export interface TabBarItem {
  icon?: LucideIcon;
  name: string;
  path: string;
  special?: boolean;
}
