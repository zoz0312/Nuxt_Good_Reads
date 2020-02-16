/*eslint-disable*/
import axios from 'axios'

export const state = () => ({
	authUser: null,
	lvl: 0
})

export const mutations = {
	SET_USER (state, user) {
		state.authUser = user.user_id;
		state.lvl = user.user_lvl;
	}
}

export const actions = {
	nuxtServerInit ({ commit }, { req, app }) {
		if (req.session.passport) {
			const { user_id, user_lvl } = req.session.passport;
			commit('SET_USER', { user_id, user_lvl });
		}
	},
	async login ({ commit }, { username, password }) {
		await axios.post('/login', { username, password }).then((result) => {
			if (result.data.success) {
				const { user_id, user_lvl } = result.data.data;
				commit('SET_USER', { user_id, user_lvl });
			}
		}).catch((err) => {
			console.log('Login Error', err);
		})
	},
	async logout ({ commit }) {
		await axios.post('/logout')
		commit('SET_USER', { user_id: null, user_lvl: 0 })
		this.$router.push('/')
	}
}
