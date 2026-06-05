import type { ComponentType } from "react";
import SummitAvenueVictorian from "./summit-avenue-victorian";
import LindenHillsTudor from "./linden-hills-tudor";
import CountryClubTudor from "./country-club-tudor";
import LakeMinnetonkaLakefront from "./lake-minnetonka-lakefront";
import KenwoodTudor from "./kenwood-tudor";
import LongfellowBungalow from "./longfellow-bungalow";
import CrocusHillVictorian from "./crocus-hill-victorian";
import HighlandParkCapeCod from "./highland-park-cape-cod";
import MorningsideTudor from "./morningside-tudor";
import IndianHillsMidcentury from "./indian-hills-midcentury";

// Keyed by `${serviceUrlSegment}/${citySlug}/${neighborhoodSlug}`
export const neighborhoodBodyByKey: Record<string, ComponentType> = {
  "kitchen-remodeling/saint-paul/summit-avenue-victorian": SummitAvenueVictorian,
  "kitchen-remodeling/minneapolis/linden-hills-tudor": LindenHillsTudor,
  "bathroom-remodeling/edina/country-club-tudor": CountryClubTudor,
  "kitchen-remodeling/wayzata/lake-minnetonka-lakefront": LakeMinnetonkaLakefront,
  "kitchen-remodeling/minneapolis/kenwood-tudor": KenwoodTudor,
  "kitchen-remodeling/minneapolis/longfellow-bungalow": LongfellowBungalow,
  "bathroom-remodeling/saint-paul/crocus-hill-victorian": CrocusHillVictorian,
  "kitchen-remodeling/saint-paul/highland-park-cape-cod": HighlandParkCapeCod,
  "bathroom-remodeling/edina/morningside-tudor": MorningsideTudor,
  "kitchen-remodeling/edina/indian-hills-midcentury": IndianHillsMidcentury,
};
