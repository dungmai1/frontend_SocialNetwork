import request from './request'

class CommentService{
    CountAllCommentForPost(PostId) {
        return request.get(`comment/CountAllCommentForPost?PostId=${PostId}`);
    }
    getAllCommentForPost(PostId,token){
        return request.get(`comment/getAllCommentForPost?PostId=${PostId}`,{
            headers:{
                'Authorization': `Bearer ${token}`
            }
        });
    }
    createComment(data,token){
        return request.post("comment/create",data,{
            headers:{
                'Authorization': `Bearer ${token}`
            }
        });
    }
}
export default new CommentService();