import { createRouter, createWebHashHistory } from 'vue-router'
import homePage from '../views/home-page.vue'
import noteApp from '../views/note-app.vue'
import noteDetails from '../views/note-details.vue'
import loginSignUp from '../views/login-signup.vue'
import store from '../store'

const router = createRouter({
	history: createWebHashHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'homePage',
			component: homePage,
		},
		{
			path: '/:type/:val?',
			name: 'note-app',
			component: noteApp,
			meta: { requiresAuth: true },
			children: [
				{
					path: ':id',
					name: 'note-details',
					component: noteDetails,
					props: true,
					meta: {
						isShowModal: true,
					},
				},
			],
		},
		{
			path: '/login',
			name: 'login',
			component: loginSignUp,
			meta: { requiresAuth: false },
		},
	],
})

router.beforeEach((to, from, next) => {
	if (to.matched.some((record) => record.meta.requiresAuth)) {
		if (!store.getters.loggedInUser) {
			next('/login')
			return
		}
		next()
	} else if (
		!to.matched.some((record) => record.meta.requiresAuth) &&
		store.getters.loggedInUser
	) {
		if (to.name === 'homePage') {
			next()
			return
		}
		next('/notes')
	} else {
		next()
	}
})

export default router
