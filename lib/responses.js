const responses = {
  /**
   * Respond with a success code and message
   *
   * @param data
   * @param code
   */
  success: (data, code) => {
    if (!data) {
      throw new Error('I do not have data to return, please supply');
    }

    return {
      statusCode: code || 200,
      headers: {
        'Access-Control-Allow-Origin': process.env.CORS_URL
      },
      body: JSON.stringify(data)
    };
  },

  /**
   * Respond with a 404 not found message
   *
   * @param message
   */
  notFound: message => {
    return {
      statusCode: 404,
      headers: {
        'Access-Control-Allow-Origin': process.env.CORS_URL
      },
      body: JSON.stringify(message || 'Not found')
    };
  },

  /**
   * Respond with an error code and message
   *
   * @param err
   */
  error: err => {
    return {
      statusCode: err && err.statusCode ? err.statusCode : 400,
      headers: {
        'Access-Control-Allow-Origin': process.env.CORS_URL
      },
      body: JSON.stringify({
        message: err && err.message ? err.message : err,
        errors: err && err.errors ? err.errors : null
      })
    };
  }
};

// eslint-disable-next-line import/prefer-default-export
export { responses };
