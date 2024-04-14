interface SimplifiedUser {
  id: string;
  email: string;
  name: string;
}

interface SimplifiedType {
  id: string;
  name: string;
}

export interface NormalizedMetric {
  id: string;
  user: SimplifiedUser;
  creator: SimplifiedUser;
  type: SimplifiedType;
  value: string;
  date: Date;
}

export interface CreateMetric {
  user_id: string;
  creator_id: string;
  type_id: string;
  value: string;
  date: Date;
}

export interface UpdateMetric {
  user_id: string;
  creator_id: string;
  type_id: string;
  value: string;
  date: Date;
}
