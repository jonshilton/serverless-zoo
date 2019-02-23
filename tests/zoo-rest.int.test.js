const request = require('supertest');

const api = request('http://localhost:4000');

describe('Zoo RESTful integration tests', () => {
  let id;
  it('/ successfully creates an animal', done => {
    api
      .post('/')
      .send({
        name: 'Brian',
        type: 'Zebra',
        height: 60,
        weight: 100,
        age: 5
      })
      .expect(200)
      .then(response => {
        expect(response.body).toBeDefined();
        id = response.body.id; // eslint-disable-line prefer-destructuring
        done();
      })
      .catch(() => done());
  });
  it('/{id} successfully reads an animal by id', done => {
    api
      .get(`/${id}`)
      .expect(200)
      .then(response => {
        expect(response.body.id).toEqual(id);
        expect(response.body.name).toEqual('Brian');
        done();
      })
      .catch(() => done());
  });
  it('/{id} successfully reads all animals', done => {
    api
      .get('/')
      .expect(200)
      .then(response => {
        expect(response.body.items.length).toBeGreaterThan(0);
        done();
      })
      .catch(() => done());
  });
  it('/ successfully updates an animal', done => {
    api
      .put(`/${id}`)
      .send({
        name: 'Brian',
        type: 'Zebra',
        height: 60,
        weight: 100,
        age: 6,
        id
      })
      .expect(200)
      .then(response => {
        expect(response.body).toBeDefined();
        return api.get(`/${id}`).expect(200);
      })
      .then(response => {
        expect(response.body.age).toEqual(6);
        done();
      })
      .catch(() => done());
  });
  it('/{id} successfully deletes an animal', done => {
    api
      .delete(`/${id}`)
      .expect(200)
      .then(response => {
        expect(response.body).toBeDefined();
        expect(response.body).toBeDefined();
        return api.get(`/${id}`).expect(404);
      })
      .then(response => {
        expect(response.body).toEqual('Not found');
        done();
      })
      .catch(() => done());
  });
});
