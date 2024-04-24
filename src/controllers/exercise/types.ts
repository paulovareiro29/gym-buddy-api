export interface FindExerciseRequest {
  id: string;
}

export interface CreateExerciseRequest {
  name?: string;
  photo?: string;
  categories: string[];
  machine_id: string;
}

export interface PatchExerciseRequest {
  name?: string;
  machine_id: string;
  photo?: string;
  categories?: string[];
}
