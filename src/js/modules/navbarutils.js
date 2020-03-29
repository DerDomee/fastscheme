class NavbarBurger {

  constructor(arg1, arg2) {
    const element = arg1, target = arg2
    element.addEventListener('click', () => {
      target.classList.toggle("opened")
    })
  }
}

var _default_navbar_element = document.querySelector('nav .nav-content #burger-menu')
var _default_navbar_target = document.querySelector('nav .nav-content ul')
var default_navbar_handler = new NavbarBurger(_default_navbar_element, _default_navbar_target)

export {
  NavbarBurger
}
