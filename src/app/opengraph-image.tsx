import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = "Minneapolis Kitchen & Bath — Twin Cities remodeling contractors";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    eyebrow: "Minneapolis Kitchen & Bath",
    title: "Twin Cities Kitchen & Bath Remodeling",
    subtitle: "Licensed, insured, fixed-price quotes",
  });
}
