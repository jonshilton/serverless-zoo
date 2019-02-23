const readAnimal = `query ReadAnimal(
  $id: ID!
  ) {
  readAnimal(id: $id) {
    id
    name
    type
    height
    weight
    age
  }
}`;

const readAnimals = `query ReadAnimals(
  $limit: Int
  $nextToken: String
  ) {
  readAnimals(
    limit: $limit
    nextToken: $nextToken
    ) {
    items {
      id
      name
      type
      height
      weight
      age
    }
  }
}`;

export { readAnimal, readAnimals };
