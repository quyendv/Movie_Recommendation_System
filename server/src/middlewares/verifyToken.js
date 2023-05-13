import jwt from 'jsonwebtoken';
import responseHandler from '../handlers/response.handler.js';

const { TokenExpiredError } = jwt; // can't import jwt, { TokenExpiredError } from 'jsonwebtoken';
/**
 * Chỉ dùng jwt sign thông tin cần thiết (id, email, role, ...) của user, sau đó ở middleware verifyToken này decode ra id rồi gọi api lấy thông tin user
 * -> jwt không phải để lấy data mà để xác minh
 */
const verifyToken = async (req, res, next) => {
  const bearerToken = req.headers.authorization; // or req.header('Authorization')
  if (!bearerToken) return responseHandler.unauthorized(res, 'Required authorization');

  const accessToken = bearerToken.split(' ')[1];
  jwt.verify(accessToken, process.env.JWT_SECRET, (err, decode) => {
    // callback nhận err và decode (là  object chứa data đc jwt.sign và iat, exp. Muốn lấy field nào thì decode.key đó)
    if (err) {
      const isExpired = err instanceof TokenExpiredError;
      // case: invalid token
      if (!isExpired) return responseHandler.unauthorized(res, 'Access token is invalid');
      // case: token is expired
      else return responseHandler.unauthorized(res, 'Access token is expired');
    }

    // Not err
    req.user = decode;
    next();
  });
};

export default verifyToken;
