const user = {
  id: true,
  email: true,
  name: true
};

const category = {
  id: true,
  name: true
};

export default {
  id: true,
  beneficiary: { select: user },
  provider: { select: user },
  category: { select: category },
  start_date: true,
  end_date: true,
  created_at: true,
  updated_at: true,
  deleted_on: true
};
