import { Crown, User2 } from "lucide-react";
import type { Participant } from "../model/fetchRoomDetail";

type WalkPlayerProps = {
  participants: Participant[];
  leaderId?: number;
};

const WalkPlayer = ({ participants, leaderId }: WalkPlayerProps) => {
  const hasParticipants = participants.length > 0;

  return (
    <div className="flex flex-col w-full gap-4">
      <div className="flex items-center">
        <span className="flex text-title-22-semibold">참여하는 사람들</span>
      </div>

      {!hasParticipants && (
        <div className="text-title-18-semibold text-gray-500">
          아직 참여한 사람이 없습니다.
        </div>
      )}

      {hasParticipants && (
        <div className="flex flex-wrap items-center gap-4">
          {participants.map((participant) => (
            <div
              key={participant.memberId}
              className="relative flex flex-col gap-2 items-center justify-center"
            >
              <div className="flex icon-xl rounded-full items-center justify-center bg-blue-50 text-blue-700">
                <User2 className="icon-m" />
              </div>
              {leaderId !== undefined && participant.memberId === leaderId && (
                <div className="absolute -top-2 -right-2 rounded-full bg-amber-100 p-1 shadow-sm">
                  <Crown className="icon-s text-amber-500" aria-label="방장" />
                </div>
              )}
              <span className="text-14-medium">{participant.memberNickName}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WalkPlayer;
