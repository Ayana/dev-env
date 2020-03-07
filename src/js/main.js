$(function() {
	const thumbClass = 'gallery-list'
	const thumbClick = window.ontouchstart === null ? 'touchstart' : 'click'

	const mySwiper = new Swiper('#rooms .js-gallery-main', {
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		pagination: {
			el: '.gallery-lists',
			type: 'custom',
			renderCustom: function(swiper, current, total) {
				const slides = swiper.slides
				let html = ''
				for (let i = 0; i < total; i++) {
					if (current == i + 1) {
						html = html + `<div class="${thumbClass} current" data-slideto="${i}">${slides[i].innerHTML}</div>`
					} else {
						html = html + `<div class="${thumbClass}" data-slideto="${i}">${slides[i].innerHTML}</div>`
					}
				}
				return html
			},
		},
	})

	const clickThumbs = () => {
		const thumbItems = document.getElementsByClassName(thumbClass)
		for (let i = 0; i < thumbItems.length; i++) {
			thumbItems[i].addEventListener(
				thumbClick,
				(e) => {
					let index = e.currentTarget.dataset.slideto
					mySwiper.slideTo(index, 500, true)
				},
				false
			)
		}
	}

	clickThumbs()
	mySwiper.on('slideChange', clickThumbs)
})
