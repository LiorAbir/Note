import { createRouter, createWebHashHistory } from 'vue-router'
import homePage from '../views/home-page.vue'
import noteApp from '../views/note-app.vue'

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
		},
	],
})

export default router
