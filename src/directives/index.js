export const focusDirective = {
	mounted: (el) => {
		el.focus()
	},
}

export const scrollDirective = {
	mounted(el, binding) {
		let f = function (evt) {
			if (binding.value(evt, el)) {
				window.removeEventListener('scroll', f)
			}
		}
		window.addEventListener('scroll', f)
	},
}
