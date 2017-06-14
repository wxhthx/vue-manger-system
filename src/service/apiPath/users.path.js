import PATH from './main.path'
const USERS_PATH = PATH + '/users'
const GETUSERS = USERS_PATH + '/users/users'
const DELETE_USER = USERS_PATH + '/users/deleteUser/'
const SAVE_USER = USERS_PATH + '/users/insertUser'
const UPDATE_USER = USERS_PATH + '/users/editUser/'
const SINGLE_USER = USERS_PATH + '/users/getUserById/'

export default {
    GETUSERS,
    DELETE_USER,
    SAVE_USER,
    UPDATE_USER,
    SINGLE_USER
}
