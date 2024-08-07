import axios from 'axios'
import { defineStore } from 'pinia'
import { useUsersStore } from '../stores/UsersStore'
import { useThreadsStore } from '../stores/ThreadsStore'
import { useForumsStore } from '../stores/ForumsStore'

export const usePostsStore = defineStore('PostsStore', {
	state: () => ({
		posts: [],
		post: {},
		usersStore: useUsersStore(),
		threadsStore: useThreadsStore(),
		forumsStore: useForumsStore(),
	}),
	getters: {
		getUserPosts: (state) => {
			return (id) => state.posts.filter((post) => post.userId === id)
		},
	},
	actions: {
		async fetchPosts(params) {
			await axios.get('/posts', { params: params }).then((res) => {
				this.posts = res.data.posts
				this.post = { ...res.data.posts[0] }
			})
		},

		async createPost(post) {
			post.userId = this.usersStore.authUser._id
			post.threadId = post.threadId || this.threadsStore.thread._id
			try {
				const resPost = await axios.post('/posts', post)
				const dbPost = resPost.data.post
				this.posts.push(dbPost)
				this.threadsStore.appendToThread(this.threadsStore.thread._id, dbPost._id, post.userId)
				this.usersStore.appendPostToUser(post.userId)
				return dbPost
			} catch (error) {
				console.log(error.response.data.msg)
			}
		},

		async updatePost(newPost) {
			if (newPost) this.post = newPost
			await axios.patch(`/posts/${this.post._id}`, this.post)
			const index = this.posts.findIndex((item) => item._id === this.post._id)
			this.posts[index] = this.post
		},
	},
})
