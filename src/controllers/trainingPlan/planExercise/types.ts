export interface FindPlanExerciseRequest {
  id: string;
}

export interface PlanRequest {
  plan_id: string;
}

export interface CreatePlanExerciseRequest {
  plan_id?: string;
  exercise_id?: string;
  repetitions?: number;
  sets?: number;
  rest_between_sets?: number;
  day?: string;
}

export interface PatchPlanExerciseRequest {
  plan_id?: string;
  exercise_id?: string;
  repetitions?: number;
  sets?: number;
  rest_between_sets?: number;
  day?: string;
}
