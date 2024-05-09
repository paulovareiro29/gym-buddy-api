export interface UserPlanRequest {
  user_id: string;
}
export interface FindUserPlanRequest extends UserPlanRequest {
  plan_id: string;
}

export interface CreateUserPlanRequest {
  user_id: string;
  plan_id: string;
  start_date: Date;
  end_date: Date;
}

export interface PatchUserPlanRequest {
  start_date?: Date;
  end_date?: Date;
}
