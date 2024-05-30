const category = {
  id: true,
  name: true
};

export default {
  id: true,
  name: true,
  categories: { select: category },
  photo: true,
  created_at: true,
  updated_at: true,
  deleted_on: true
};
