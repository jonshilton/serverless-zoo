import { Operations } from '../lib/operations';
import { responses } from '../lib/responses';

const ops = new Operations('Animals');

exports.handler = async event => {
  try {
    const response = await ops.deleteRecord({ id: event.pathParameters.id });
    return responses.success(response);
  } catch (err) {
    return responses.error(err);
  }
};
