import axios from 'axios'
import path from './apiPath/login.path'
class LoginService {
    login (data) {
        return axios({
            method: 'post',
            url: path.LOGIN_PATH,
            data: {
                admin_name: data.admin_name,
                password: data.password
            }
        })
    }
}

export default new LoginService()
