<template>
	<section v-if="msg" class="user-msg flex">
		<p>{{ msg }}</p>
		<button @click="msg = null">x</button>
	</section>
</template>
<script>
import { eventBus } from '../services/eventBus-service'

export default {
	name: 'user-msg',
	data() {
		return {
			msg: '',
		}
	},
	created() {
		eventBus.on('show-msg', this.setMsg)
	},
	methods: {
		setMsg(msg) {
			this.msg = msg
			setTimeout(() => {
				this.msg = null
			}, 5000)
		},
	},
}
</script>
