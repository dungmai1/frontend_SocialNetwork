import request from './request'

class LikeService{
    addLike(PostId,token){
        return request.post(`like/add?PostId=${PostId}`,null,{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    }
    CountAllLikeForPost(PostId) {
        return request.get(`like/CountAllLikeForPost?PostId=${PostId}`);
    }
    AllUserLikePost(PostId){
        return request.get(`like/AllUserLikePost?PostId=${PostId}`)
    }

}
export default new LikeService();