/**
 * 
 * handle business of navbar
 */
import {DetailsTableData, DetailsTheadData, OperateList, Status, Types} from '../mock/admin/adminDetails'

class AdminService {
    getDetailsTableData () {
        return DetailsTableData
    }
    getDetailsTheadData () {
        return DetailsTheadData
    }
    getDetailsOprateList () {
        return OperateList
    }
    getStatus () {
        return Status
    }
    getTypes () {
        return Types
    }
}

export default new AdminService()
