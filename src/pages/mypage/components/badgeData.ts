import type { ComponentType, SVGProps } from "react";
import { Crown, Goal, Heart } from "lucide-react";
import FirstWalkBadge from "@/shared/assets/walk/first_walk.svg?react";
import WalkThreeKmBadge from "@/shared/assets/walk/walk_3km.svg?react";
import WalkFiveKmBadge from "@/shared/assets/walk/walk_5km.svg?react";
import WalkTenKmBadge from "@/shared/assets/walk/walk_10km.svg?react";

export type BadgeMeta = {
  id: string;
  label: string;
  threshold: number;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
};

export const distanceBadges: BadgeMeta[] = [
  {
    id: "distance-3",
    label: "3KM 달성!",
    threshold: 3,
    Icon: WalkThreeKmBadge,
  },
  { id: "distance-5", label: "5KM 달성!", threshold: 5, Icon: WalkFiveKmBadge },
  {
    id: "distance-10",
    label: "10KM 달성!",
    threshold: 10,
    Icon: WalkTenKmBadge,
  },
];

export const walkCountBadges: BadgeMeta[] = [
  { id: "walk-1", label: "첫 산책 달성!", threshold: 1, Icon: FirstWalkBadge },
  { id: "walk-3", label: "3회 산책 달성!", threshold: 3, Icon: Heart },
  { id: "walk-5", label: "5회 산책 달성!", threshold: 5, Icon: Goal },
  { id: "walk-10", label: "10회 산책 달성!", threshold: 10, Icon: Crown },
];
