import axios from 'axios'
import Path from './apiPath/organization.path'
import Mock from '@/mock/organization.mock'
class OrgannizationService {
    getAll (data) {
        if (!data) {
            data = {}
        }
        return axios({
            method: 'get',
            url: Path.ALL_ORGANIZAIOTN,
            params: data
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
            url: Path.SAVE_ORGANIZATION,
            data: data
        })
    }
    updateOrganizaiotn (id, data) {
        return axios({
            method: 'put',
            url: Path.UPDATE_ORGANIZATION + id,
            data: data
        })
    }
    getOrganizationById (organization_id) {
        return axios({
            method: 'get',
            url: Path.GET_ORGANIZATION_BY_ID + organization_id
        })
    }
    deleteOrganization (organization_id) {
        return axios({
            method: 'delete',
            url: Path.DELETE_ORGANIZATION + organization_id
        })
    }
}

export default new OrgannizationService()

