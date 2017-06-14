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

    getSingleUser (userId) {
        return axios({
            method: 'get',
            url: UsersPath.SINGLE_USER + userId
        })
    }

    deleteUser (user_id) {
        return axios({
            method: 'delete',
            url: UsersPath.DELETE_USER + user_id
        })
    }
    saveUser (data) {
        return axios({
            method: 'post',
            url: UsersPath.SAVE_USER,
            data: data
        })
    }
    updateUser (userId, data) {
        return axios({
            method: 'put',
            url: UsersPath.UPDATE_USER + userId,
            data: data
        })
    }
}
export default new Users()
