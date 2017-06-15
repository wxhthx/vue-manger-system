import PATH from './main.path'
const COURSES_PATH = PATH + '/courses'
const ALL_COURSES = COURSES_PATH + '/courses'
const CATEGORIES = COURSES_PATH + '/courseCategories'
const OSS_SIGN = PATH + '/video/resources/oss/sign'
const SAVE_COURSE = COURSES_PATH + '/courses'
const ALL_TUTORS = COURSES_PATH + '/tutors'
const ADD_COURSE_CHAPTER = COURSES_PATH + '/Chapters'
const ADD_COURSE_SECTION = COURSES_PATH + '/sections'
const ADD_COURSE_UNIT = COURSES_PATH + '/units'
const GET_COURSE_TUTORS_NAME = COURSES_PATH + '/tutors/tutorIdLst/'
const COURSE_TYPES_CLASS = COURSES_PATH + '/courseClasses'
const GET_COURSE_TYPES = COURSE_TYPES_CLASS + '/courseClassContent'
const COURSE_TYPES_CATEGORY = COURSES_PATH + '/courseCategories'
// const GET_SIMPLE_COURSE = PATH + '/courses'
export default {
    ALL_COURSES,
    CATEGORIES,
    OSS_SIGN,
    SAVE_COURSE,
    ALL_TUTORS,
    ADD_COURSE_CHAPTER,
    ADD_COURSE_SECTION,
    ADD_COURSE_UNIT,
    GET_COURSE_TUTORS_NAME,
    COURSE_TYPES_CLASS,
    GET_COURSE_TYPES,
    COURSE_TYPES_CATEGORY
}
