import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// middleware bảo vệ routes - yêu cầu authentication
export const protect = async (req, res, next) => {
  let token;

  // kiểm tra token trong header Authorization (Bearer token)
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
  // hoặc kiểm tra token trong cookies
  else if (req.cookies.token) {
    token = req.cookies.token;
  }

  // nếu không có token thì từ chối truy cập
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized to access this route'
    });
  }

  try {
    // xác minh token với jwt secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // lấy thông tin user từ id trong token và gắn vào req.user
    req.user = await User.findById(decoded.userId);

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'No user found with this token'
      });
    }

    // cho phép tiếp tục đến controller
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized to access this route'
    });
  }
};

// middleware phân quyền theo role (hiện tại chưa dùng)
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `User role ${req.user.role} is not authorized to access this route`
      });
    }
    next();
  };
};
