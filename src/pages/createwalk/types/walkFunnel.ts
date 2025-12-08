// 산책 생성에서 사용하는 전체 폼 상태
export type MissionName = "NO_MISSION" | "PLOGGING" | "DELIVERY" | "PARK";

export type CreateWalkFormState = {
  pathId?: string;
  courseName?: string;
  maxParticipants?: number;
  walkDateTime?: string;
  subMission?: MissionName;
};

export type CreateWalkStep =
  | "ChooseCourse"
  | "ChooseCourseName"
  | "ChooseDateTime"
  | "ChooseSubMission";

// 모든 step에서 context 모양은 동일하게 CreateWalkFormState
export type CreateWalkSteps = Record<CreateWalkStep, CreateWalkFormState>;

export const CREATE_WALK_STEPS: CreateWalkStep[] = [
  "ChooseCourse",
  "ChooseCourseName",
  "ChooseDateTime",
  "ChooseSubMission",
];
