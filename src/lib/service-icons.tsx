import {
  Bath,
  Building2,
  ChefHat,
  Droplets,
  Hammer,
  Home,
  LayoutGrid,
  Layers,
  ShowerHead,
  Square,
  Wrench,
  type LucideIcon,
} from "lucide-react";

export const serviceIconMap: Record<string, LucideIcon> = {
  "kitchen-remodeling": ChefHat,
  "bathroom-remodeling": Bath,
  "custom-cabinetry": LayoutGrid,
  countertops: Square,
  "tile-flooring": Layers,
  "full-gut": Hammer,
  "general-contractor": Wrench,
  "schluter-certified-shower-installer": ShowerHead,
  "basement-remodeling": Home,
  "whole-house-remodel": Building2,
};

export function getServiceIcon(slug: string): LucideIcon {
  return serviceIconMap[slug] ?? Wrench;
}
