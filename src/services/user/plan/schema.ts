const user = {
  id: true,
  email: true,
  name: true
};
const plan = {
  id: true,
  name: true,
  creator: { select: user }
};

export default {
  user: { select: user },
  plan: { select: plan },
  start_date: true,
  end_date: true,
  created_at: true,
  updated_at: true,
  deleted_on: true
};
