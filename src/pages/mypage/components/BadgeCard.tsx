import type { ComponentType, SVGProps } from "react";

type BadgeCardProps = {
  label: string;
  Icon?: ComponentType<SVGProps<SVGSVGElement>>;
  imageUrl?: string;
  bgColor?: string;
  iconColor?: string;
};

const BadgeCard = ({
  label,
  Icon,
  imageUrl,
  bgColor = "bg-gray-300",
  iconColor = "text-blue-700",
}: BadgeCardProps) => {
  return (
    <div className="flex flex-col gap-4 w-full rounded-xl border-2 border-gray-50 bg-sky-50 items-center justify-center p-6">
      <div
        className={`flex w-full aspect-square ${bgColor} rounded-xl items-center justify-center overflow-hidden`}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={label}
            className="w-full h-full object-contain"
          />
        ) : Icon ? (
          <Icon className={`flex ${iconColor} w-24 h-24`} />
        ) : null}
      </div>

      <div className="flex w-full items-center justify-center">
        <span className="flex text-title-16-semibold">{label}</span>
      </div>
    </div>
  );
};

export default BadgeCard;
