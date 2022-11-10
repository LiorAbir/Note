import { createRouter, createWebHashHistory } from 'vue-router'
import homePage from '../views/home-page.vue'
import noteApp from '../views/note-app.vue'
import noteDetails from '../views/note-details.vue'

const router = createRouter({
	history: createWebHashHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'homePage',
			component: homePage,
		},
		{
			path: '/note',
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
	],
})

export default router
