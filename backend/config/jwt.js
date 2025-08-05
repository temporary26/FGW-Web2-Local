import jwt from 'jsonwebtoken';

// tạo jwt token từ user id
export const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE, // thời gian hết hạn từ env
  });
};

// xác minh jwt token
export const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

// gửi response kèm token trong cookie và json
export const sendTokenResponse = (user, statusCode, res) => {
  // tạo token từ user id
  const token = generateToken(user._id);

  // cấu hình cookie options
  const options = {
    expires: new Date(
      Date.now() + 30 * 24 * 60 * 60 * 1000 // 30 ngày
    ),
    httpOnly: true, // không thể truy cập từ javascript
    secure: process.env.NODE_ENV === 'production', // chỉ https trong production
    sameSite: 'strict' // bảo vệ csrf
  };

  // gửi response với cookie và json data
  res.status(statusCode).cookie('token', token, options).json({
    success: true,
    token,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
      isEmailVerified: user.isEmailVerified
    }
  });
};
