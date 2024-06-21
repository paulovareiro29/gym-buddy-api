export interface UserPlanRequest {
  user_id: string;
}
export interface FindUserPlanRequest extends UserPlanRequest {
  plan_id: string;
}

export interface CreateUserPlanRequest {
  plan_id: string;
  start_date: Date;
  end_date: Date;
}

export interface PatchUserPlanRequest {
  start_date?: Date;
  end_date?: Date;
}
