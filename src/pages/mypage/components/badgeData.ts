import type { ComponentType, SVGProps } from "react";
import { Crown, Goal } from "lucide-react";
import WalkThreeKmBadge from "@/shared/assets/walk/walk_3km.svg?react";
import WalkFiveKmBadge from "@/shared/assets/walk/walk_5km.svg?react";
import WalkTenKmBadge from "@/shared/assets/walk/walk_10km.svg?react";
import firstWalkCountBadge from "@/shared/assets/walk_count/badge_first.jpeg";
import threeWalkCountBadge from "@/shared/assets/walk_count/badge_1.png";

export type BadgeMeta = {
  id: string;
  label: string;
  threshold: number;
  Icon?: ComponentType<SVGProps<SVGSVGElement>>;
  imageUrl?: string;
  bgColor?: string;
  iconColor?: string;
};

export const distanceBadges: BadgeMeta[] = [
  {
    id: "distance-3",
    label: "3KM 달성!",
    threshold: 3,
    Icon: WalkThreeKmBadge,
    bgColor: "bg-blue-200",
    iconColor: "text-blue-700",
  },
  {
    id: "distance-5",
    label: "5KM 달성!",
    threshold: 5,
    Icon: WalkFiveKmBadge,
    bgColor: "bg-green-200",
    iconColor: "text-green-700",
  },
  {
    id: "distance-10",
    label: "10KM 달성!",
    threshold: 10,
    Icon: WalkTenKmBadge,
    bgColor: "bg-purple-200",
    iconColor: "text-purple-700",
  },
];

export const walkCountBadges: BadgeMeta[] = [
  {
    id: "walk-1",
    label: "첫 산책 달성!",
    threshold: 1,
    imageUrl: firstWalkCountBadge,
    bgColor: "bg-pink-200",
  },
  {
    id: "walk-3",
    label: "3회 산책 달성!",
    threshold: 3,
    imageUrl: threeWalkCountBadge,
    bgColor: "bg-yellow-200",
  },
  {
    id: "walk-5",
    label: "5회 산책 달성!",
    threshold: 5,
    Icon: Goal,
    bgColor: "bg-orange-200",
    iconColor: "text-orange-700",
  },
  {
    id: "walk-10",
    label: "10회 산책 달성!",
    threshold: 10,
    Icon: Crown,
    bgColor: "bg-amber-200",
    iconColor: "text-amber-700",
  },
];
