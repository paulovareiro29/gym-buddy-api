export interface FindContractRequest {
  id: string;
}

export interface CreateContractRequest {
  beneficiary_id?: string;
  provider_id?: string;
  category_id?: string;
  start_date?: Date;
  end_date?: Date;
}

export interface PatchContractRequest {
  beneficiary_id?: string;
  provider_id?: string;
  category_id?: string;
  start_date?: Date;
  end_date?: Date;
}
