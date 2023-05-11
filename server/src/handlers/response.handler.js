import createError from 'http-errors';

const responseWithData = (res, statusCode, data) => res.status(statusCode).json(data);

const responseHandler = {
  // 500
  internalServerError: (res, msg) => {
    const error = createError.InternalServerError(msg);
    return responseWithData(res, error.status, {
      success: false,
      message: error.message || 'Oops! Something went wrong',
    });
  },
  // 400
  badRequest: (res, msg) => {
    const error = createError.BadRequest(msg);
    return responseWithData(res, error.status, {
      success: false,
      message: error.message,
    });
  },
  // 401
  unauthorized: (res, msg) => {
    const error = createError.Unauthorized(msg);
    return responseWithData(res, error.status, {
      success: false,
      message: error.message,
    });
  },
  // 404
  notFound: (res, msg) => {
    const error = createError.NotFound(msg);
    return responseWithData(res, error.status, {
      success: false,
      message: error.message,
    });
  },
  // 200
  ok: (res, data) =>
    responseWithData(res, 200, {
      success: true,
      data,
    }),
  // 201
  created: (res, data) =>
    responseWithData(res, 201, {
      success: true,
      data,
    }),
};

export default responseHandler;
