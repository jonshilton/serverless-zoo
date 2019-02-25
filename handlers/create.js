import { Operations } from '../lib/operations';
import { responses } from '../lib/responses';

const ops = new Operations('Animals');

exports.handler = async event => {
  const data = JSON.parse(event.body);
  try {
    const response = await ops.createRecord(data);
    return responses.success(response);
  } catch (err) {
    return responses.error(err);
  }
};
