import { Operations } from '../lib/operations';
import { responses } from '../lib/responses';

const ops = new Operations('Animals');

exports.handler = async event => {
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
