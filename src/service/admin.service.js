/**
 * 
 * handle business of navbar
 */
import {DetailsTableData, DetailsTheadData, OperateList, Status, Types} from '../mock/admin/adminDetails'

const AdminService = {
    getDetailsTableData: () => DetailsTableData,
    getDetailsTheadData: () => DetailsTheadData,
    getDetailsOprateList: () => OperateList,
    getStatus: () => Status,
    getTypes: () => Types
}

export default {
    AdminService
}
