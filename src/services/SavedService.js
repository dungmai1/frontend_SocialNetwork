import request from "./request";

class SavedService {
  CreateSavedPost(PostId, token) {
    return request.post(`post/Save?PostId=${PostId}`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  LoadSavePost(token) {
    return request.get("post/GetAllSavedPost", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
export default new SavedService();
