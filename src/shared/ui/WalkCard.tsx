import { Link } from "react-router-dom";

type WalkCardProps = {
  roomId: number | string;
  title: string;
  startAt: string;
  startMarketName: string;
  endMarketName: string;
  leaderName: string;
};

const WalkCard = ({
  roomId,
  title,
  startAt,
  startMarketName,
  endMarketName,
  leaderName,
}: WalkCardProps) => {
  return (
    <Link
      to={`/room/${roomId}`}
      className="block rounded-2xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
    >
      <div className="flex w-full flex-col gap-3 p-4">
        <div className="flex items-start justify-between gap-3">
          <p className="text-title-20-semibold text-gray-900">{title}</p>
          <span className="shrink-0 rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-600">
            방장 {leaderName}
          </span>
        </div>

        <div className="flex items-center gap-2 text-title-18-semibold text-gray-800">
          <span
            className="inline-flex h-2 w-2 rounded-full bg-green-400"
            aria-hidden
          />
          <span>{startAt}</span>
        </div>

        <div className="h-px w-full bg-gray-100" />

        <div className="flex flex-col gap-2 text-16-semibold text-gray-700">
          <p>
            모이는 장소:{" "}
            <span className="text-gray-900">{startMarketName}</span>
          </p>
          <p>
            도착 장소: <span className="text-gray-900">{endMarketName}</span>
          </p>
        </div>
      </div>
    </Link>
  );
};

export default WalkCard;
