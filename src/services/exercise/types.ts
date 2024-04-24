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

export interface NormalizedExercise {
  id: string;
  name: string;
  machine: SimplifiedMachine;
  categories: SimplifiedCategory[];
  photo: string;
}

export interface CreateExercise {
  name?: string;
  machine_id?: string;
  photo?: string;
  categories: string[];
}

export interface UpdateExercise {
  name?: string;
  machine_id: string;
  photo?: string;
  categories?: string[];
}
