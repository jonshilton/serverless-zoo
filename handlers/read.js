import { Operations } from '../lib/operations';
import { responses } from '../lib/responses';

const ops = new Operations('Animals');

exports.handler = async event => {
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
