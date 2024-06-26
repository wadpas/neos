import axios from 'axios'
import { defineStore } from 'pinia'

export const useForumsStore = defineStore('ForumsStore', {
	state: () => {
		return {
			forums: [],
		}
	},
	getters: {
		forumsByIds(state) {
			return (ids) => ids.map((id) => state.forums.find((forum) => forum._id === id))
		},
		forumById(state) {
			return (id) => state.forums.find((forum) => forum._id === id)
		},
	},
	actions: {
		async fetchForums() {
			if (this.forums.length) return
			await axios.get('/forums').then((res) => {
				this.forums = res.data.forums
			})
		},
	},
})
