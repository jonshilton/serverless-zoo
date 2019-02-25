# Serverless Zoo

A simple RESTful API and GraphQL API to demonstrate how to use the Serverless framework using AWS Lambda, DynamoDb and GraphQL.

## Getting started

### Prerequisites

This package requires serverless to be installed globally:

```
npm install -g serverless
```

Also, create a config directory and local config file.

```
mkdir config
touch config/env.local
```

The following environment variables need ot be set:

- CORS (string): either an endpoint or wildcard (\*) can be used
- GRAPHQL_ENDPOINT (string): the endpoint for the graphQl server
- DEPLOYMENT_BUCKET (string): the deployment bucket to use for serverless artifacts

### Installing

```
git clone <repo>
cd ./<repo>
npm install
```

### Running the tests

`jest` is used for testing.

Run `npm run test:unit` for unit tests.
Run `npm run test:int` for integration tests using `supertest` for the RESTful endpoints and `apollo-boost` client for GraphQL endpoints.

### Running locally

`serverless offline` is used for running the application locally:

```
npm start
```

This is will launch DynamoDB locally.

### Deployment

Resources are deployed using the services framework and run using `npm` scripts:

```
npm run deploy:shadow
```

```
npm run deploy:prod
```
