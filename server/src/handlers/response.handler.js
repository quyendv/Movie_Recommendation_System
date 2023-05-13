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
  // 200 - chỉ truyền res thì các arguments undefined còn lại sẽ tự không được gửi về mà không gây lỗi
  ok: (res, msg, data) =>
    responseWithData(res, 200, {
      success: true,
      message: msg,
      data,
    }),
  // 201 - chỉ truyền res thì các arguments undefined còn lại sẽ tự không được gửi về mà không gây lỗi
  created: (res, msg, data) =>
    responseWithData(res, 201, {
      success: true,
      message: msg,
      data,
    }),
};

export default responseHandler;
