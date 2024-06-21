const category = {
  id: true,
  name: true
};

const machine = {
  id: true,
  name: true,
  photo: true,
  categories: { select: category }
};

export default {
  id: true,
  name: true,
  machine: { select: machine },
  categories: { select: category },
  photo: true,
  created_at: true,
  updated_at: true,
  deleted_on: true
};
