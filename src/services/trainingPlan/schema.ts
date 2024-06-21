const user = {
  id: true,
  email: true,
  name: true
};

const userPlan = { user: { select: user } };

export default {
  id: true,
  name: true,
  creator: { select: user },
  userPlan: { select: userPlan },
  created_at: true,
  updated_at: true,
  deleted_on: true
};
