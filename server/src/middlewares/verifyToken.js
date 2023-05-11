import jwt, { TokenExpiredError } from 'jsonwebtoken';
import responseHandler from '../handlers/response.handler';

/**
 * - Có thể dùng jwt sign chỉ id của user, sau đó ở middleware verifyToken này decode ra id rồi gọi api lấy thông tin user (moonflix)
 * - Hoặc sign trực tiếp các thông tin user cần thiết (hoặc tất cả) rồi tại đây decode hết ra như bên dưới
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
