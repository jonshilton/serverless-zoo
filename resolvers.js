import { Operations } from './lib/operations';

const ops = new Operations('Animals');

// eslint-disable-next-line import/prefer-default-export
export const resolvers = {
  Query: {
    readAnimal: (root, args) => ops.getRecord(args),
    readAnimals: (root, args) => ops.getRecords(args)
  },
  Mutation: {
    createAnimal: (root, args) => ops.createRecord(args),
    updateAnimal: (root, args) => ops.updateRecord(args),
    deleteAnimal: (root, args) => ops.deleteRecord(args)
  }
};
