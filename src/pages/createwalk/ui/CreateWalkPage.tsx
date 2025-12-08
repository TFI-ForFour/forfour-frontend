import { useFunnel } from "@use-funnel/react-router-dom";
import { useEffect, useState } from "react";
import ChooseCourse from "../components/ChooseCourse";
import ChooseDateTime from "../components/ChooseDateTime";
import ChooseSubMission from "../components/ChooseSubMission";
import type {
  CreateWalkFormState,
  CreateWalkStep,
  CreateWalkSteps,
} from "../types/walkFunnel";
import { CREATE_WALK_STEPS } from "../types/walkFunnel";
import { useNavigate } from "react-router-dom";
import ChooseCourseName from "../components/ChooseCourseName";
import { createWalkRoom } from "../model/createRoom";

const CreateWalkPage = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const funnel = useFunnel<CreateWalkSteps>({
    id: "create",
    initial: {
      step: "ChooseCourse",
      context: {},
    },
  });

  const currentStep = funnel.step as CreateWalkStep;
  const currentIndex = CREATE_WALK_STEPS.indexOf(currentStep);
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === CREATE_WALK_STEPS.length - 1;

  const ctx = funnel.context as CreateWalkFormState;
  const [courseNameDraft, setCourseNameDraft] = useState(ctx.courseName ?? "");
  const [maxParticipantsDraft, setMaxParticipantsDraft] = useState(
    ctx.maxParticipants ?? 1
  );

  useEffect(() => {
    if (currentStep === "ChooseCourseName") {
      setCourseNameDraft(ctx.courseName ?? "");
      setMaxParticipantsDraft(ctx.maxParticipants ?? 1);
    }
  }, [currentStep, ctx.courseName, ctx.maxParticipants]);

  const canGoNext =
    (currentStep === "ChooseCourse" && !!ctx.pathId) ||
    (currentStep === "ChooseCourseName" && courseNameDraft.trim().length > 0) ||
    (currentStep === "ChooseDateTime" && !!ctx.walkDateTime) ||
    currentStep === "ChooseSubMission";

  const handlePrev = () => {
    if (isFirst) return;
    funnel.history.back();
  };

  const handleNext = async () => {
    if (!canGoNext || isSubmitting) return;

    if (currentStep === "ChooseCourseName") {
      const nextStep = CREATE_WALK_STEPS[currentIndex + 1];
      const nextContext = {
        ...ctx,
        courseName: courseNameDraft.trim(),
        maxParticipants: maxParticipantsDraft,
      };
      funnel.history.push(nextStep, nextContext);
      return;
    }

    if (currentStep === "ChooseSubMission") {
      const pathId = Number(ctx.pathId);
      const title = ctx.courseName;
      const startAt = ctx.walkDateTime;
      const missionName = ctx.subMission ?? "NO_MISSION";
      const maxMemberCount = ctx.maxParticipants ?? 1;

      if (!title || !startAt || Number.isNaN(pathId)) {
        console.error("산책 방 생성에 필요한 값이 없습니다.", {
          title,
          startAt,
          pathId,
        });
        return;
      }

      setIsSubmitting(true);
      try {
        await createWalkRoom({
          title,
          pathId,
          missionName,
          maxMemberCount,
          startAt,
        });
        navigate("/createwalk/success", { replace: true });
      } catch (error) {
        console.error("산책 방 생성 실패:", error);
      } finally {
        setIsSubmitting(false);
      }

      return;
    }

    const nextStep = CREATE_WALK_STEPS[currentIndex + 1];
    funnel.history.push(nextStep, ctx);
  };

  return (
    <div className="flex flex-col h-full min-h-0 items-center gap-4">
      <main className="flex-1 w-full min-h-0 flex flex-col items-center gap-6 overflow-y-auto pb-6">
        <funnel.Render
          ChooseCourse={({ context, history }) => (
            <ChooseCourse
              pathId={context.pathId}
              onChangePathId={(pathId) =>
                history.replace("ChooseCourse", { ...context, pathId })
              }
            />
          )}
          ChooseCourseName={() => (
            <ChooseCourseName
              courseName={courseNameDraft}
              onChangeCourseName={setCourseNameDraft}
              maxParticipants={maxParticipantsDraft}
              onChangeMaxParticipants={setMaxParticipantsDraft}
            />
          )}
          ChooseDateTime={({ context, history }) => (
            <ChooseDateTime
              walkDateTime={context.walkDateTime}
              onChangeWalkDateTime={(walkDateTime) =>
                history.replace("ChooseDateTime", {
                  ...context,
                  walkDateTime,
                })
              }
            />
          )}
          ChooseSubMission={({ context, history }) => (
            <ChooseSubMission
              subMission={context.subMission}
              onChangeSubMission={(subMission) =>
                history.replace("ChooseSubMission", { ...context, subMission })
              }
            />
          )}
        />
      </main>

      {/* 하단 공통 버튼 영역 */}
      <footer className="sticky w-full bottom-0 left-0 right-0 bg-white/0 py-4">
        <div className="flex gap-3">
          <button
            className={`flex-1 bg-white text-black rounded-xl border border-gray-200 py-3 text-title-20-semibold ${
              isFirst ? "invisible pointer-events-none" : ""
            }`}
            onClick={handlePrev}
            aria-hidden={isFirst}
            tabIndex={isFirst ? -1 : 0}
          >
            이전 단계
          </button>

          <button
            className="flex-1 rounded-xl bg-sky-500 py-3 text-title-20-semibold  text-white disabled:bg-gray-300"
            onClick={handleNext}
            disabled={!canGoNext || isSubmitting}
          >
            {isLast
              ? isSubmitting
                ? "생성 중..."
                : "산책 방 만들기"
              : "다음 단계"}
          </button>
        </div>
      </footer>
    </div>
  );
};

export default CreateWalkPage;
