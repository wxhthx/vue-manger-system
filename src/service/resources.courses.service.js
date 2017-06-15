import axios from 'axios'
import Path from './apiPath/courses.path'
import {AllCourseTypes} from '@/mock/courses.mock'

class CourseTypes {
    getAllCourseTypes () {
        return axios({
            method: 'get',
            url: Path.GET_COURSE_TYPES
        })
    }

    saveClass (data) {
        return axios({
            method: 'post',
            url: Path.COURSE_TYPES_CLASS,
            data: data
        })
    }
    updateClass (class_id, data) {
        return axios({
            method: 'put',
            url: Path.COURSE_TYPES_CLASS + '/' + class_id,
            data: data
        })
    }

    deleteClass (class_id) {
        return axios({
            method: 'delete',
            url: Path.COURSE_TYPES_CLASS + '/' + class_id
        })
    }

    saveCategory (data) {
        return axios({
            method: 'post',
            url: Path.COURSE_TYPES_CATEGORY,
            data: data
        })
    }

    updateCategory (category_id, data) {
        return axios({
            method: 'put',
            url: Path.COURSE_TYPES_CATEGORY + '/' + category_id,
            data: data
        })
    }

    deleteCategory (category_id) {
        return axios({
            method: 'delete',
            url: Path.COURSE_TYPES_CATEGORY + '/' + category_id
        })
    }
}
 export default new CourseTypes()
