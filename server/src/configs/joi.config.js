import Joi from 'joi';

/** Joi rules */
export const username = Joi.string().required();
export const password = Joi.string()
  .min(6)
  // .pattern(new RegExp('^[a-zA-Z0-9]{6,30}$')) // chữ + số, [6, 30]
  // .pattern(
  //   new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'),
  //   'Password must have at least 8 characters, one uppercase, one lowercase and one special character',
  // ) // min 8, at least number, uppercase, lowercase, special character. See more: https://www.thepolyglotdeveloper.com/2015/05/use-regex-to-test-password-strength-in-javascript/
  .required(); // TODO: password BE nên check nhẹ nhàng nhường phần check rules nghiêm ngặt hơn ở FE
// export const confirmPassword = Joi.any().valid(Joi.ref('password')).required(); // Không tạo joiRule ở đây được, phải tạo trực tiếp ở hàm Joi.object() -> Nếu dùng Joi.ref('password') sẽ không bắt lỗi required mà chỉ check match nếu nhập confirmPassword
export const displayName = Joi.string().min(6).required();
