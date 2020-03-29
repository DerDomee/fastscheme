
const DEFAULT_THEMES = [
  {name: "Use system preference (@prefers-color-scheme)", class: ""},
  {name: "Light Theme", class: "force-theme-light"},
  {name: "Dark Theme", class: "force-theme-dark"},
  {name: "Black Theme", class: "force-theme-darkest"}]

class Rescheme {


  constructor(arg1, arg2) {
    const element = arg1, config = arg2
    var selector = document.createElement('select')
    element.appendChild(selector)
    if(config === null) {
      DEFAULT_THEMES.forEach(function(theme) {
        var option = document.createElement('option')
        option.appendChild(document.createTextNode(theme.name))
        option.setAttribute('theme-class', theme.class)
        selector.appendChild(option)
      })
    selector.addEventListener("change", () => {
      var selIndex = selector.options[selector.selectedIndex]
      var indexClass = selIndex.getAttribute('theme-class')
      this.changeTheme(indexClass)
    })
    }
  }

  /**
    */
  changeTheme(arg1, arg2 = true) {
    const newtheme = arg1, usecookie = arg2
    document.querySelectorAll('*').forEach(function(node) {
      var classes = node.className
      var classprefix = "force-theme-"
      var clist = classes.split(" ").filter(function (c){
        return c.lastIndexOf(classprefix, 0) !== 0
      })
      clist.push(newtheme)
      node.className = clist.join(" ").trim()
    })
  }
}
var _defaultdomelement = document.querySelectorAll("scheme-select")[0]
new Rescheme(_defaultdomelement, null)

export {
  Rescheme
}
