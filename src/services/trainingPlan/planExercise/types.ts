export interface SimplifiedUser {
  id: string;
  email: string;
  name: string;
}

export interface SimplifiedPlan {
  id: string;
  name: string;
  creator: SimplifiedUser;
}

export interface SimplifiedCategory {
  id: string;
  name: string;
}

export interface SimplifiedMachine {
  id: string;
  name: string;
  categories: SimplifiedCategory[];
  photo: string;
}

export interface SimplifiedExercise {
  id: string;
  name: string;
  photo: string;
  machine: SimplifiedMachine;
}

export interface NormalizedPlanExercise {
  id: string;
  plan: SimplifiedPlan;
  exercise: SimplifiedExercise;
  repetitions: number;
  sets: number;
  rest_between_sets: number;
  day: number;
}

export interface CreatePlanExercise {
  plan_id?: string;
  exercise_id?: string;
  repetitions?: number;
  sets?: number;
  rest_between_sets?: number;
  day?: number;
}

export interface UpdatePlanExercise {
  plan_id?: string;
  exercise_id?: string;
  repetitions?: number;
  sets?: number;
  rest_between_sets?: number;
  day?: number;
}
