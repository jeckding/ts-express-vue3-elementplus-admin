import { getUserInfo } from '@/api/user'
import { USER } from '../types'
const state = {
  // 用户信息
  userInfo: {}
}

const mutations = {
  // 更新用户信息
  updateUserInfo(state, payload) {
    state.userInfo = Object.assign({}, state.userInfo, payload)
  }
}

const actions = {
  getUserInfo: async ({ commit }) => {
    const data: any = await getUserInfo()
    const result = <USER>{
      userId: data.userId,
      userName: data.name, 
      phone: data.phone,
      company: data.company
    }
    commit('updateUserInfo', result)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
