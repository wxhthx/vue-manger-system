import PATH from './main.path'
const USERS_PATH = PATH + '/users'
const ALL_ORGANIZAIOTN = USERS_PATH + '/getOrganizationByName'
const GET_ORGANIZATION_BY_ID = USERS_PATH + '/getOrganizationById/'
const SAVE_ORGANIZATION = USERS_PATH + '/insertOrganization'
const UPDATE_ORGANIZATION = USERS_PATH + '/editOrganization/'
const DELETE_ORGANIZATION = USERS_PATH + '/deleteOrganizationById/'
export default {
    ALL_ORGANIZAIOTN,
    GET_ORGANIZATION_BY_ID,
    SAVE_ORGANIZATION,
    UPDATE_ORGANIZATION,
    DELETE_ORGANIZATION
}
