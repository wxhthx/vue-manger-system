import tutorPATH from './apiPath/tutor.path'
import axios from 'axios'
import tutorMock from '../mock/tutor.mock'

class TutorService {
    getAllTutors (data) {
        return axios({
            method: 'get',
            url: tutorPATH.GET_ALL_TUTOR,
            params: data
        })
    }

    saveTutor (data) {
        return axios({
            method: 'post',
            url: tutorPATH.GET_ALL_TUTOR,
            data: data
        })
    }

    updateTutor (tutorId, data) {
        return axios({
            method: 'put',
            url: tutorPATH.GET_ALL_TUTOR + '/' + tutorId,
            data: data
        })
    }

    getSingleTutor (tutorId, data) {
        return axios({
            method: 'get',
            url: tutorPATH.GET_ALL_TUTOR + '/' + tutorId,
            data: data
        })
    }

    deleteTutor (tutorId) {
        return axios({
            method: 'delete',
            url: tutorPATH.GET_ALL_TUTOR + '/' + tutorId
        })
    }

    getDetailsTheadData () {
        return tutorMock.DetailsTheadData
    }

    getDetailsOprateList () {
        return tutorMock.OperateList
    }
}

export default new TutorService()

