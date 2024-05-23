export interface FindTrainingPlanRequest {
  id: string;
}
export interface FindTrainingPlanByCreatorRequest {
  creatorId: string;
}

export interface CreateTrainingPlanRequest {
  name: string;
  creator_id: string;
}

export interface PatchTrainingPlanRequest {
  name?: string;
  creator_id?: string;
}
