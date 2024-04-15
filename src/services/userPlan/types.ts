interface SimplifiedUser {
  id: string;
  email: string;
  name: string;
}
interface SimplifiedPlan {
  name: string;
  creator: SimplifiedUser;
}

export interface NormalizedUserPlan {
  id: string;
  user: SimplifiedUser;
  plan: SimplifiedPlan;
  start_date: Date;
  end_date: Date;
}

export interface CreateUserPlan {
  user_id: string;
  plan_id: string;
  start_date: Date;
  end_date: Date;
}

export interface UpdateUserPlan {
  user_id: string;
  plan_id: string;
  start_date: Date;
  end_date: Date;
}
