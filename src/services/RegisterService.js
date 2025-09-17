import request from './request'

class RegisterService{
    Register(data){
        return request.post("api/v1/auth/register",data)
    }

}
export default new RegisterService();