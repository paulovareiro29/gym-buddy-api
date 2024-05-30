const user = {
  id: true,
  email: true,
  name: true
};

const type = {
  id: true,
  name: true
};

export default {
  id: true,
  user: { select: user },
  creator: { select: user },
  type: { select: type },
  value: true,
  date: true,
  created_at: true,
  updated_at: true,
  deleted_on: true
};
