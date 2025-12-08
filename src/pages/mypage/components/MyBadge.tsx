import BadgeCard from "./BadgeCard";
import { distanceBadges, walkCountBadges, type BadgeMeta } from "./badgeData";

type MyBadgeProps = {
  totalWalkCount?: number;
  totalDistance?: number;
};

const getEarnedBadges = (
  totalDistance: number,
  totalWalkCount: number
): BadgeMeta[] => {
  const earnedDistanceBadges =
    totalDistance >= 3
      ? distanceBadges.filter(({ threshold }) => totalDistance >= threshold)
      : [];

  const earnedWalkCountBadges =
    totalWalkCount >= 1
      ? walkCountBadges.filter(({ threshold }) => totalWalkCount >= threshold)
      : [];

  return [...earnedDistanceBadges, ...earnedWalkCountBadges];
};

const MyBadge = ({ totalWalkCount = 0, totalDistance = 0 }: MyBadgeProps) => {
  const earnedBadges = getEarnedBadges(totalDistance, totalWalkCount);

  return (
    <div className="flex flex-col w-full gap-4">
      <div className="flex items-center justify-start">
        <span className="flex text-title-22-semibold text-start">
          내가 얻은 뱃지
        </span>
      </div>

      {earnedBadges.length > 0 ? (
        <div className="grid grid-cols-2 w-full gap-4">
          {earnedBadges.map(
            ({ id, Icon, label, imageUrl, bgColor, iconColor }) => (
              <BadgeCard
                key={id}
                Icon={Icon}
                label={label}
                imageUrl={imageUrl}
                bgColor={bgColor}
                iconColor={iconColor}
              />
            )
          )}
        </div>
      ) : (
        <div className="flex w-full rounded-xl border-2 border-gray-50 bg-gray-100 py-7 px-6 items-center justify-center">
          <span className="flex text-title-16-semibold text-gray-500">
            산책에 참여해서 뱃지를 얻어보세요!
          </span>
        </div>
      )}
    </div>
  );
};

export default MyBadge;
