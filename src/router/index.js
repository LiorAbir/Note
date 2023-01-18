import { createRouter, createWebHashHistory } from 'vue-router'
import homePage from '../views/home-page.vue'
import noteApp from '../views/note-app.vue'
import noteDetails from '../views/note-details.vue'
import loginSignUp from '../views/login-signup.vue'

const router = createRouter({
	history: createWebHashHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'homePage',
			component: homePage,
		},
		{
			path: '/:type/:label?',
			name: 'note-app',
			component: noteApp,

			children: [
				{
					path: ':id',
					name: 'note-details',
					component: noteDetails,
					meta: {
						showModal: true,
					},
				},
			],
		},
		{
			path: '/login',
			name: 'login',
			component: loginSignUp,
		},
	],
})

export default router
