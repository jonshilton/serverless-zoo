const createAnimal = `mutation CreateAnimal(
  $name: String!
  $type: String!
  $height: Int
  $weight: Int
  $age: Int
) {
  createAnimal(
    name: $name
    type: $type
    height: $height
    weight: $weight
    age: $age
  ) {
    id
    name
    weight
    type
    height
    age
  }
}`;

const updateAnimal = `mutation UpdateAnimal(
  $id: ID!
  $name: String
  $type: String
  $height: Int
  $weight: Int
  $age: Int
) {
  updateAnimal(
    id: $id
    name: $name
    type: $type
    height: $height
    weight: $weight
    age: $age
  ) {
    id
    name
    weight
    type
    height
    age
  }
}`;

const deleteAnimal = `mutation DeleteAnimal(
  $id: ID!
) {
  deleteAnimal(
    id: $id
  ) {
    id
    name
    weight
    type
    height
    age
  }
}`;

export { createAnimal, updateAnimal, deleteAnimal };
