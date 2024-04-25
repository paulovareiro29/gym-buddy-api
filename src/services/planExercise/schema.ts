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

const category = {
  id: true,
  name: true
};

const machine = {
  id: true,
  name: true,
  categories: { select: category },
  photo: true
};

const exercise = {
  id: true,
  name: true,
  photo: true,
  machine: { select: machine }
};

export default {
  id: true,
  plan: { select: plan },
  exercise: { select: exercise },
  repetitions: true,
  sets: true,
  rest_between_sets: true,
  day: true,
  created_at: true,
  updated_at: true
};
