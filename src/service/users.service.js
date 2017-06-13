import Users_mock from '../mock/users.mock'
import UsersPath from './apiPath/users.path'
import axios from 'axios'

class Users {
    getDetailsTheadData () {
        return Users_mock.DetailsTheadData
    }
    getDetailsOprateList () {
        return Users_mock.OperateList
    }
    getAllUsers (data) {
        return axios({
            method: 'get',
            url: UsersPath.GETUSERS,
            params: data
        })
    }
    deleteUser (user_id) {
        return axios({
            method: 'delete',
            url: UsersPath.DELETE_USER,
            params: {
                userId: user_id
            }
        })
    }
    saveUser (data) {
        return axios({
            method: 'post',
            url: UsersPath.SAVE_USER,
            data: data
        })
    }
    updateUser (data) {
        return axios({
            method: 'post',
            url: UsersPath.SAVE_USER,
            data: data
        })
    }
}
export default new Users()
