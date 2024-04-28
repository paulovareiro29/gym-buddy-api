interface SimplifiedUser {
  id: string;
  email: string;
  name: string;
}

interface SimplifiedCategory {
  id: string;
  name: string;
}

export interface NormalizedContract {
  id: string;
  beneficiary: SimplifiedUser;
  provider: SimplifiedUser;
  category: SimplifiedCategory;
  start_date: Date;
  end_date?: Date;
  created_at: Date;
  updated_at: Date;
}

export interface CreateContract {
  beneficiary_id: string;
  provider_id: string;
  category_id: string;
  start_date: Date;
  end_date?: Date;
}

export interface UpdateContract {
  beneficiary_id?: string;
  provider_id?: string;
  category_id?: string;
  start_date?: Date;
  end_date?: Date;
}
