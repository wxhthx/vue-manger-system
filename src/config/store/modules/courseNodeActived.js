import * as types from '../types'
const state = {
  activedType: '',
  activedId: 0,
  activedChapterId: 0,
  activedSectionId: 0,
  activedUnitId: 0,
  activedName: '',
  video_url: ''
}

const getters = {
  courseNodeActived: state => ({
      'activedType': state.activedType,
      'activedId': state.activedId,
      'activedChapterId': state.activedChapterId,
      'activedSectionId': state.activedSectionId,
      'activedUnitId': state.activedUnitId,
      'activedName': state.activedName
    }),
  nodeUpLoader: state => state.nodeUpLoader
}

const actions = {
    updateCourseNodeActived ({commit, state}, data) {
        commit(types.UPDATE_COURSE_NODE_ACTIVED, data)
    },
    updateVideoUrl ({commit, state}, data) {
        commit(types.UPDATE_VIDEO_URL, data)
    }
}

// mutations
const mutations = {
    [types.UPDATE_COURSE_NODE_ACTIVED] (state, data) {
        state.activedType = data.activedType
        state.activedId = data.activedId
        state.activedChapterId = data.activedChapterId
        state.activedSectionId = data.activedSectionId
        state.activedUnitId = data.activedUnitId
        state.activedName = data.activedName
    },
    [types.UPDATE_VIDEO_URL] (state, data) {
        state.nodeUpLoader = data
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
