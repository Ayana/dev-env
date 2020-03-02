



// Get width
function getWidth() {
  const width = document.querySelector(".item").offsetWidth*0.94
  document.querySelector(".item").style.height = width + 'px'
}

window.addEventListener('load', function() {
  getWidth()
})
window.addEventListener('resize', function() {
  getWidth()
})


// jQuery
$(function() {
  const checkboxItem = $('.checkbox__item') 

  // Add id to input
  $(checkboxItem).eq(0).children('input').attr('id', 'answer_1')
  $(checkboxItem).eq(1).children('input').attr('id', 'answer_2')

  // Toggle class
  $(checkboxItem).on('click', function() {
    $(this).toggleClass('active') 
  })

  // Autofocus with keyboard enter
  let targetElm = 'input[type=text],select,input[type=checkbox],input[type=submit]'

  $(targetElm).keypress(function(e) {      
    if (e.keyCode == 13) {
      e.preventDefault()
      let index = $(targetElm).index(this)
      $(targetElm).eq(index + 1).focus()
    }
  })
})

