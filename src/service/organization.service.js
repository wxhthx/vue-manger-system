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
    saveOrganizaiotn (data) {
        return axios({
            method: 'post',
            url: Path.ALL_ORGANIZAIOTN,
            data: data
        })
    }
    updateOrganizaiotn (data) {
        return axios({
            method: 'put',
            url: Path.ALL_ORGANIZAIOTN,
            data: data
        })
    }
    getOrganizationById (organization_id) {
        return axios({
            method: 'get',
            url: Path.ALL_ORGANIZAIOTN + '/' + organization_id
        })
    }
    deleteOrganization (organization_id) {
        return axios({
            method: 'delete',
            url: Path.ALL_ORGANIZAIOTN + '/' + organization_id
        })
    }
}

export default new OrgannizationService()

