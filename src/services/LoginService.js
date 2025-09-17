import request from './request'
class LoginService{
    Login(data){
        return request.post("api/v1/auth/login",data)
    }
}
export default new LoginService();