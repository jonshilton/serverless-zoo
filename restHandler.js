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
  try {
    const response = await ops.createRecord(data);
    return responses.success(response);
  } catch (err) {
    return responses.error(err);
  }
};

/**
 * Read handler
 *
 * @param event
 */
module.exports.read = async event => {
  let response;
  if (event.pathParameters && event.pathParameters.id) {
    try {
      response = await ops.getRecord({ id: event.pathParameters.id });
    } catch (err) {
      return responses.error(err);
    }
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
    try {
      response = await ops.getRecords(args);
    } catch (err) {
      return responses.error(err);
    }
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

  try {
    const response = await ops.updateRecord(data);
    return responses.success(response);
  } catch (err) {
    return responses.error(err);
  }
};

/**
 * Delete handler
 *
 * @param event
 */
module.exports.delete = async event => {
  try {
    const response = await ops.deleteRecord({ id: event.pathParameters.id });
    return responses.success(response);
  } catch (err) {
    return responses.error(err);
  }
};
