import type { ComponentType } from "react";
import SummitAvenueVictorian from "./summit-avenue-victorian";
import LindenHillsTudor from "./linden-hills-tudor";
import CountryClubTudor from "./country-club-tudor";
import LakeMinnetonkaLakefront from "./lake-minnetonka-lakefront";

// Keyed by `${serviceUrlSegment}/${citySlug}/${neighborhoodSlug}`
export const neighborhoodBodyByKey: Record<string, ComponentType> = {
  "kitchen-remodeling/saint-paul/summit-avenue-victorian": SummitAvenueVictorian,
  "kitchen-remodeling/minneapolis/linden-hills-tudor": LindenHillsTudor,
  "bathroom-remodeling/edina/country-club-tudor": CountryClubTudor,
  "kitchen-remodeling/wayzata/lake-minnetonka-lakefront": LakeMinnetonkaLakefront,
};
