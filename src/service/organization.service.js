import axios from 'axios'
import Path from './apiPath/organization.path'
import Mock from '@/mock/organization.mock'
class OrgannizationService {
    getAll () {
        return axios({
            method: 'get',
            url: Path.ALL_ORGANIZAIOTN
        })
    }
    getTheadData () {
        return Mock.theadData
    }
    getOperateList () {
        return Mock.OperateList
    }
}

export default new OrgannizationService()

