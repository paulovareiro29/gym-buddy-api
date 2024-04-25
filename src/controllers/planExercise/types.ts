export interface FindPlanExerciseRequest {
  id: string;
}

export interface CreatePlanExerciseRequest {
  plan_id?: string;
  exercise_id?: string;
  repetitions?: number;
  sets?: number;
  rest_between_sets?: number;
  day?: number;
}

export interface PatchPlanExerciseRequest {
  plan_id?: string;
  exercise_id?: string;
  repetitions?: number;
  sets?: number;
  rest_between_sets?: number;
  day?: number;
}
