import type { Metadata } from "next";
import WorkIndex from "@/components/sections/WorkIndex";

export const metadata: Metadata = {
  title: "Work — Vereen Digital",
  description:
    "Selected engagements: AI citations in under five months, 18% year-on-year revenue growth, 726,000 impressions in six months. Every number with its context.",
};

export default function WorkPage() {
  return <WorkIndex />;
}
