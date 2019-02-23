const schema = `
type Mutation {
  # Create an animal
  createAnimal(
    name: String!
    type: String!
    height: Int
    weight: Int
    age: Int
  ): Animal

  # Update an animal
  updateAnimal(
    id: ID!
    name: String
    type: String
    height: Int
    weight: Int
    age: Int
  ): Animal

  # Delete an animal
  deleteAnimal(
    id: ID
  ): Animal
}

type Query {
  readAnimal(id: ID!): Animal
  readAnimals(limit: Int, nextToken: String): AnimalConnection
}

directive @aws_subscribe(mutations: [String]) on FIELD_DEFINITION

type Subscription {
  onCreateAnimal: Animal @aws_subscribe(mutations: ["createAnimal"])
  onUpdateAnimal: Animal @aws_subscribe(mutations: ["updateAnimal"])
}

type Animal {
  id: ID!
  name: String!
  type: String!
  height: Int
  weight: Int
  age: Int
}

type AnimalConnection {
  items: [Animal]
  nextToken: String
}

schema {
  query: Query
  mutation: Mutation
  subscription: Subscription
}`;

// eslint-disable-next-line import/prefer-default-export
export { schema };
