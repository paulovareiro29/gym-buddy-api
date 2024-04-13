import { MetricType, User } from '@prisma/client';

export interface NormalizedUserMetric {
  id: string;
  user: User;
  creator: User;
  type: MetricType;
  value: string;
  date: Date;
}

export interface CreateUserMetric {
  user_id: string;
  creator_id: string;
  type_id: string;
  value: string;
  date: Date;
}

export interface UpdateUserMetric {
  user_id: string;
  creator_id: string;
  type_id: string;
  value: string;
  date: Date;
}
