const state = {
	cartNum: 1
}
const getters = {
	cartNum(state) {
		return state.cartNum
	}
}
const mutations = {
	addCart(state, payload) {
		state.cartNum = payload;
	}
}
const actions = {
	getCart({commit}, params) {
		setTimeout(() => {
			commit('addCart', 100)
		}, 2000)
		
	}
}
export default {
	state,
	getters,
	mutations,
	actions,
}