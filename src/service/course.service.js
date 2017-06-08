import axios from 'axios'
import Path from './apiPath/courses.path'
import {theadData, OperateList} from '@/mock/courses.mock'
class CourseService {
    getCourses () {
        return axios({
            method: 'get',
            url: Path.ALL_COURSES
        })
    }
    
    getSelectedCourses (data) {
        return axios({
            method: 'get',
            url: Path.ALL_COURSES,
            params: data
        })
    }

    getCategories () {
        return axios({
            method: 'get',
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
            method: 'get',
            url: Path.OSS_SIGN
        })
    }
    saveCourse (payload) {
        return axios({
            method: 'post',
            url: Path.SAVE_COURSE,
            data: {
                "category_id": payload.category_id,
                "course_name": payload.course_name,
                "depict": payload.depict,
                "icon_url": payload.icon_url,
                "is_leaf_node": payload.is_leaf_node,
                "learning_target_number": payload.learning_target_number,
                "picture_url": payload.picture_url,
                "recommended_level": payload.recommended_level,
                "tutor_id": payload.tutor_id
            }
        })
    }

    saveEditedCourse (payload) {
        return axios({
            method: 'put',
            url: Path.SAVE_COURSE,
            data: {
                "category_id": payload.category_id,
                "course_name": payload.course_name,
                "depict": payload.depict,
                "icon_url": payload.icon_url,
                "is_leaf_node": payload.is_leaf_node,
                "learning_target_number": payload.learning_target_number,
                "picture_url": payload.picture_url,
                "recommended_level": payload.recommended_level,
                "tutor_id": payload.tutor_id
            }
        })
    }

    getSimpleCourse (id) {
        return axios({
            method: 'get',
            url: Path.SAVE_COURSE + '/' + id
        })
    }

    deleteSimpleCourse (id) {
        return axios({
            method: 'delete',
            url: Path.SAVE_COURSE + '/' + id
        })
    }

    getAllTutors () {
        return axios({
            method: 'get',
            url: Path.ALL_TUTORS
        })
    }

    addChapters (data) {
        return axios({
            method: 'post',
            url: Path.ADD_COURSE_CHAPTER,
            data: data
        })
    }

    updateChapters (chapter_id, data) {
        return axios({
            method: 'put',
            url: Path.ADD_COURSE_CHAPTER + '/' + chapter_id,
            data: data
        })
    }

    deleteChapters (chapter_id) {
        return axios({
            method: 'delete',
            url: Path.ADD_COURSE_CHAPTER + '/' + chapter_id
        })
    }

    addSections (data) {
        return axios({
            method: 'post',
            url: Path.ADD_COURSE_SECTION,
            data: data
        })
    }

    updateSections (section_id, data) {
        return axios({
            method: 'put',
            url: Path.ADD_COURSE_SECTION + '/' + section_id,
            data: data
        })
    }

    deleteSections (section_id) {
        return axios({
            method: 'delete',
            url: Path.ADD_COURSE_SECTION + '/' + section_id
        })
    }

    addUnits (data) {
        return axios({
            method: 'post',
            url: Path.ADD_COURSE_UNIT,
            data: data
        })
    }

    updateUnits (unit_id, data) {
        return axios({
            method: 'put',
            url: Path.ADD_COURSE_UNIT + '/' + unit_id,
            data: data
        })
    }

    deleteUnits (unit_id) {
        return axios({
            method: 'delete',
            url: Path.ADD_COURSE_UNIT + '/' + unit_id
        })
    }
}

export default new CourseService()
