import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ThreadView from '../views/ThreadView.vue'
import ThreadCreate from '../views/ThreadCreate.vue'
import ForumView from '../views/ForumView.vue'
import NotFound from '../views/NotFoundView.vue'
import ProfileView from '../views/ProfileView.vue'
import axios from 'axios'

const routes = [
	{
		path: '/',
		name: 'HomeView',
		component: HomeView,
	},
	{
		path: '/me',
		name: 'ProfileView',
		component: ProfileView,
		meta: { toTop: true, smoothScroll: true },
	},
	{
		path: '/me/edit',
		name: 'ProfileEditView',
		component: ProfileView,
		props: { edit: true },
	},
	{
		path: '/forums/:id',
		name: 'ForumView',
		component: ForumView,
		props: true,
	},
	{
		path: '/threads/:id',
		name: 'ThreadView',
		component: ThreadView,
		props: true,
		beforeEnter(to, from, next) {
			axios
				.get('/threads/' + to.params.id)
				.then(() => {
					next()
				})
				.catch(() => {
					next({
						name: 'NotFound',
						params: { pathMatch: to.path.substring(1).split('/') },
						query: to.query,
						hash: to.hash,
					})
				})
		},
	},
	{
		path: '/forums/:forumId/threads/create',
		name: 'ThreadCreate',
		component: ThreadCreate,
		props: true,
	},
	{
		path: '/:pathMatch(.*)*',
		name: 'NotFound',
		component: NotFound,
	},
]

const router = createRouter({
	history: createWebHistory(),
	routes,
	scrollBehavior(to) {
		const scroll = {}
		if (to.meta?.toTop) scroll.top = 0
		if (to.meta?.smoothScroll) scroll.behavior = 'smooth'
		return scroll
	},
})

export default router
