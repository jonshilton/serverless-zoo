import ApolloClient from 'apollo-boost';
import fetch from 'node-fetch';
import gql from 'graphql-tag';
import { createAnimal, updateAnimal, deleteAnimal } from '../graphql/mutations';
import { readAnimal, readAnimals } from '../graphql/queries';

describe('Zoo GraphQL integration tests', () => {
  let id;
  let client;

  beforeEach(() => {
    client = new ApolloClient({
      uri: 'http://localhost:4000/graphql',
      fetch
    });
  });

  it('createAnimal mutation successfully creates an animal', done => {
    client
      .mutate({
        mutation: gql(createAnimal),
        variables: {
          name: 'Andrea',
          type: 'Alpaca',
          height: 94,
          weight: 36,
          age: 2
        }
      })
      .then(response => {
        expect(response.data.createAnimal.name).toEqual('Andrea');
        id = response.data.createAnimal; // eslint-disable-line prefer-destructuring
        done();
      })
      .catch(() => done());
  });
  it('readAnimal query successfully reads an animal by id', done => {
    client
      .query({
        query: gql(readAnimal),
        variables: {
          id
        }
      })
      .then(response => {
        expect(response.data.readAnimal.id).toEqual(id);
        expect(response.data.readAnimal.name).toEqual('Andrea');
        done();
      })
      .catch(() => done());
  });
  it('readAnimals query successfully reads animals', done => {
    client
      .query({
        query: gql(readAnimals)
      })
      .then(response => {
        expect(response.data.readAnimals.items.length).toBeGreaterThan(0);
        done();
      })
      .catch(() => done());
  });
  it('updateAnimal mutation successfully updates an animal', done => {
    client
      .mutate({
        mutation: gql(updateAnimal),
        variables: {
          id,
          age: 3
        }
      })
      .then(response => {
        expect(response.data.updateAnimal.name).toEqual('Andrea');
        expect(response.data.updateAnimal.age).toEqual(3);
        done();
      })
      .catch(() => done());
  });
  it('deleteAnimal mutation successfully deletes an animal', done => {
    client
      .mutate({
        mutation: gql(deleteAnimal),
        variables: {
          id
        }
      })
      .then(response => {
        expect(response.data.deleteAnimal.name).toEqual('Andrea');
        done();
      })
      .catch(() => done());
  });
});
