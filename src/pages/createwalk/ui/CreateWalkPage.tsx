import { useFunnel } from "@use-funnel/react-router-dom";
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

const CreateWalkPage = () => {
  const navigate = useNavigate();
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

  const canGoNext =
    (currentStep === "ChooseCourse" && !!ctx.pathId) ||
    (currentStep === "ChooseCourseName" && !!ctx.courseName) ||
    (currentStep === "ChooseDateTime" && !!ctx.walkDateTime) ||
    currentStep === "ChooseSubMission";

  const handlePrev = () => {
    if (isFirst) return;
    funnel.history.back();
  };

  const handleNext = () => {
    if (!canGoNext) return;

    if (currentStep === "ChooseSubMission") {
      const payload: CreateWalkFormState = {
        pathId: ctx.pathId,
        courseName: ctx.courseName,
        walkDateTime: ctx.walkDateTime,
        subMission: ctx.subMission,
      };

      // TODO: 산책 방 생성 API
      console.log("산책 방 생성 payload:", payload);

      // API 연결이 아직 되지 않았기에 성공했다고 가정하고, 성공 페이지로 이동
      navigate("/createwalk/success", { replace: true });
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
          ChooseCourseName={({ context, history }) => (
            <ChooseCourseName
              courseName={context.courseName}
              onChangeCourseName={(courseName) =>
                history.replace("ChooseCourseName", { ...context, courseName })
              }
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
            disabled={!canGoNext}
          >
            {isLast ? "산책 방 만들기" : "다음 단계"}
          </button>
        </div>
      </footer>
    </div>
  );
};

export default CreateWalkPage;
