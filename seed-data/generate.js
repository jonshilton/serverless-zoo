const faker = require('faker'); // eslint-disable-line import/no-extraneous-dependencies
const jsonfile = require('jsonfile'); // eslint-disable-line import/no-extraneous-dependencies

const numRecords = 10;

const records = [];

const animals = [
  'Elephant',
  'Penguin',
  'Lion',
  'Tiger',
  'Meerkat',
  'Giraffe',
  'Shark',
  'Chimpanzee',
  'Hyacinth Macaw'
];

for (let i = 0; i < numRecords; i += 1) {
  records.push({
    id: faker.random.uuid(),
    name: faker.name.firstName(),
    type: faker.random.arrayElement(animals),
    height: faker.random.number({ min: 10, max: 200 }),
    weight: faker.random.number({ min: 0, max: 100 }),
    age: faker.random.number({ min: 0, max: 12 })
  });
}

jsonfile.writeFileSync('Animals.json', records);
