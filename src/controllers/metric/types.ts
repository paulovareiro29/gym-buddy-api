export interface FindMetricRequest {
  id: string;
}

export interface CreateMetricRequest {
  user_id: string;
  creator_id: string;
  type_id: string;
  value: string;
  date: Date;
}

export interface PatchMetricRequest {
  user_id: string;
  creator_id: string;
  type_id: string;
  value: string;
  date: Date;
}
