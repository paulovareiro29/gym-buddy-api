export interface SimplifiedCategory {
  id: string;
  name: string;
}

export interface NormalizedMachine {
  id: string;
  name: string;
  categories: SimplifiedCategory[];
  photo: string;
}

export interface CreateMachine {
  name?: string;
  photo?: string;
  categories: string[];
}

export interface UpdateMachine {
  name?: string;
  photo?: string;
  categories?: string[];
}
