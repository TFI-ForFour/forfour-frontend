import type { ComponentType, SVGProps } from "react";

type BadgeCardProps = {
  label: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
};

const BadgeCard = ({ label, Icon }: BadgeCardProps) => {
  return (
    <div className="flex flex-col gap-4 w-full rounded-xl border-2 border-gray-50 bg-gray-200 items-center justify-center p-4">
      <div className="flex w-full h-[120px] bg-gray-300 rounded-full items-center justify-center pt-5 p-2">
        <Icon className="flex text-blue-700" />
      </div>

      <div className="flex w-full items-center justify-center">
        <span className="flex text-title-16-semibold">{label}</span>
      </div>
    </div>
  );
};

export default BadgeCard;
