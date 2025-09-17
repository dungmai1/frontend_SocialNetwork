import { jwtDecode } from 'jwt-decode';

const checkAuth = () => {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    return false;
  }

  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Thời gian hiện tại tính bằng giây
    if (decoded.exp < currentTime) {
      // Token đã hết hạn
      return false;
    } else {
      // Token còn hiệu lực
      return true;
    }
  } catch (error) {
    return false;
  }
}

export default checkAuth;
