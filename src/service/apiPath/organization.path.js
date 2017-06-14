import PATH from './main.path'
const USERS_PATH = PATH + '/users'
const ALL_ORGANIZAIOTN = USERS_PATH + '/getOrganizationByName'
const SAVE_ORGANIZATION = USERS_PATH + '/insertOrganization'
const DELETE_ORGANIZATION = USERS_PATH + '/deleteOrganizationById'
export default {
    ALL_ORGANIZAIOTN,
    SAVE_ORGANIZATION,
    DELETE_ORGANIZATION
}
