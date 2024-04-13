export interface FindUserMetricRequest {
  id: string;
}

export interface CreateUserMetricRequest {
  user_id: string;
  creator_id: string;
  type_id: string;
  value: string;
  date: Date;
}

export interface PatchUserMetricRequest {
  user_id: string;
  creator_id: string;
  type_id: string;
  value: string;
  date: Date;
}
