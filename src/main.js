import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import { focusDirective, scrollDirective } from './directives'

import './assets/styles/styles.scss'

const app = createApp(App)

//DIRECTIVES
app.directive('focus', focusDirective)
app.directive('scroll', scrollDirective)

app.use(router)
app.use(store)

app.mount('#app')
