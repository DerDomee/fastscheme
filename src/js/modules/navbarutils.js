class NavbarUtils {

  constructor() {
    console.log("NavbarUtils wurde geladen!");
  }

}

document.querySelector('nav .nav-content #burger-menu').addEventListener('click', () => {
  document.querySelector('nav .nav-content ul').classList.toggle("opened")
})

export default NavbarUtils
