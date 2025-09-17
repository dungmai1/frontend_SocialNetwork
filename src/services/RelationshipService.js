import request from "./request";

class RelationshipService {
  Followers(username) {
    return request.get(`relationship/followers/${username}`);
  }
  Following(username) {
    return request.get(`relationship/following/${username}`);
  }
  AddFollow(token, username) {
    return request.post(`relationship/addFollow/${username}`,null ,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  CheckFollow(token, username) {
    return request.get(`relationship/checkfollow/${username}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
export default new RelationshipService();
