import axios from 'axios'
import {ALL_COURSES, CATEGORIES} from './apiPath/courses.path'
import {theadData} from '@/mock/courses.mock'
class CourseService {
    getCourses () {
        return axios({
            type: 'get',
            url: ALL_COURSES
        })
    }
    getCategories () {
        return axios({
            type: 'get',
            url: CATEGORIES
        })
    }
    getTheadData () {
        return theadData
    }
}

export default new CourseService()
