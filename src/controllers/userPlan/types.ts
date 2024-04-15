export interface FindUserPlanRequest {
  id: string;
}

export interface CreateUserPlanRequest {
  user_id: string;
  plan_id: string;
  start_date: Date;
  end_date: Date;
}

export interface PatchUserPlanRequest {
  user_id: string;
  plan_id: string;
  start_date: Date;
  end_date: Date;
}
