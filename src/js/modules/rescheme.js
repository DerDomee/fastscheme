var enableTheme = function (newTheme = null) {
  document.querySelectorAll('*').forEach(function(node) {
    node.classList.remove("force-theme-dark")
    node.classList.remove("force-theme-light")
    node.classList.remove("force-theme-darkest")
    if(newTheme != null) node.classList.add(newTheme)
  })
}

export default enableTheme
