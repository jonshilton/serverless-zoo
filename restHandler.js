import { Operations } from './lib/operations';
import { responses } from './lib/responses';

const ops = new Operations('Animals');

/**
 * Create handler
 *
 * @param event
 */
module.exports.create = async event => {
  const data = JSON.parse(event.body);
  const response = await ops.createRecord(data);
  return responses.success(response);
};

/**
 * Read handler
 *
 * @param event
 */
module.exports.read = async event => {
  let response;
  if (event.pathParameters && event.pathParameters.id) {
    response = await ops.getRecord({ id: event.pathParameters.id });
  } else {
    const args = {
      limit:
        event.queryStringParameters && event.queryStringParameters.limit
          ? event.queryStringParameters.limit
          : null,
      nextToken:
        event.queryStringParameters && event.queryStringParameters.nextToken
          ? event.queryStringParameters.nextToken
          : null
    };
    response = await ops.getRecords(args);
  }

  if (!response) {
    return responses.notFound();
  }
  return responses.success(response);
};

/**
 * Update handler
 *
 * @param event
 */
module.exports.update = async event => {
  const data = JSON.parse(event.body);

  if (!data.id || data.id !== event.pathParameters.id) {
    return responses.error('ID does not match the body');
  }

  const response = await ops.updateRecord(data);
  return responses.success(response);
};

/**
 * Delete handler
 *
 * @param event
 */
module.exports.delete = async event => {
  const response = await ops.deleteRecord({ id: event.pathParameters.id });
  return responses.success(response);
};
