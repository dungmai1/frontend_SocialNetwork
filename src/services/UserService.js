import request from "./request";

class UserService {
  getUserByUserName(username) {
    return request.get(`user/${username}`);
  }
  getUser(token) {
    return request.get("user/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  getUserbySearch(token, textSearch) {
    return request.get(`user/search?textSearch=${textSearch}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  getAllUser(token) {
    return request.get("user/getAllUser", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  updateUser(token, avatar) {
    return request.put(`user/updateUser`, avatar, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "text/plain",
      },
    });
  }
}
export default new UserService();
