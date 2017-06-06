import axios from 'axios'
import Path from './apiPath/courses.path'
import {theadData, OperateList} from '@/mock/courses.mock'
class CourseService {
    getCourses () {
        return axios({
            type: 'get',
            url: Path.ALL_COURSES
        })
    }
    getCategories () {
        return axios({
            type: 'get',
            url: Path.CATEGORIES
        })
    }
    getTheadData () {
        return theadData
    }
    getOperateList () {
        return OperateList
    }
    getOssSign () {
        return axios({
            type: 'get',
            url: Path.OSS_SIGN
        })
    }
}

export default new CourseService()
