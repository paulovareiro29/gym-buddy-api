const user = {
  id: true,
  email: true,
  name: true
};
const plan = {
  name: true,
  creator: { select: user }
};

export default {
  id: true,
  user: { select: user },
  plan: { select: plan },
  start_date: true,
  end_date: true,
  created_at: true,
  updated_at: true
};
