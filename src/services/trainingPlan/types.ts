interface SimplifiedUser {
  id: string;
  email: string;
  name: string;
}

export interface NormalizedTrainingPlan {
  id: string;
  name: string;
  creator: SimplifiedUser;
}

export interface CreateTrainingPlan {
  name: string;
  creator_id: string;
}

export interface UpdateTrainingPlan {
  name: string;
}
