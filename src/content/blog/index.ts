import type { ComponentType } from "react";
import KitchenRemodelCost from "./kitchen-remodel-cost-minneapolis";
import BathroomRemodelCost from "./bathroom-remodel-cost-minneapolis";
import QuartzVsGranite from "./quartz-vs-granite-countertops";
import BathroomTileTrends from "./bathroom-tile-trends-2026";
import KitchenTimeline from "./kitchen-remodel-timeline-twin-cities";
import RemodelPermits from "./minneapolis-kitchen-remodel-permits";
import CabinetBrands from "./kitchen-cabinet-brands-twin-cities";
import BestTimeToRemodel from "./best-time-to-remodel-minnesota";
import KitchenROI from "./kitchen-remodel-roi-minneapolis";
import SmallBathroomIdeas from "./small-bathroom-remodel-ideas-minneapolis";
import TubToShowerCost from "./tub-to-shower-conversion-cost-minneapolis";
import CurblessShower from "./curbless-shower-design-guide";
import TileShowerWaterproofing from "./tile-shower-waterproofing-guide";
import WalkInShowerNoDoor from "./walk-in-shower-no-door";
import ThirtyPercentRule from "./30-percent-rule-remodeling";

export const blogBodyBySlug: Record<string, ComponentType> = {
  "kitchen-remodel-cost-minneapolis": KitchenRemodelCost,
  "bathroom-remodel-cost-minneapolis": BathroomRemodelCost,
  "quartz-vs-granite-countertops": QuartzVsGranite,
  "bathroom-tile-trends-2026": BathroomTileTrends,
  "kitchen-remodel-timeline-twin-cities": KitchenTimeline,
  "minneapolis-kitchen-remodel-permits": RemodelPermits,
  "kitchen-cabinet-brands-twin-cities": CabinetBrands,
  "best-time-to-remodel-minnesota": BestTimeToRemodel,
  "kitchen-remodel-roi-minneapolis": KitchenROI,
  "small-bathroom-remodel-ideas-minneapolis": SmallBathroomIdeas,
  "tub-to-shower-conversion-cost-minneapolis": TubToShowerCost,
  "curbless-shower-design-guide": CurblessShower,
  "tile-shower-waterproofing-guide": TileShowerWaterproofing,
  "walk-in-shower-no-door": WalkInShowerNoDoor,
  "30-percent-rule-remodeling": ThirtyPercentRule,
};
