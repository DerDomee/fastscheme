import {set_cookie, get_cookie} from './../utils/cookie'

const DEFAULT_THEMES = [
  {name: "Use system preference (@prefers-color-scheme)", class: ""},
  {name: "Light Theme", class: "force-theme-light"},
  {name: "Dark Theme", class: "force-theme-dark"},
  {name: "Black Theme", class: "force-theme-darkest"}]

/**
  * Rescheme Class providing the selector for scheme-overrides.
  * The function of @prefers-color-scheme works without any javascript,
  * this class only exists for manual overriding of the theme by the user.
  *
  *
  */
class Rescheme {

  /**
    * Generate a theme-selector and registering
    * the corresponding event listener.
    * @constructor
    * @param {DOMElement} arg1 element: The DOMElement where the selector should be placed in
    * @param {Object[]} [arg2] config: Custom Configuration of theme names and classes
    * @param {String} arg2[].name - The displayed name of the theme
    * @param {String} arg2[].class - The class utilizing this theme
    * @throws InvalidOperationException - when arg1 is not a valid element in the DOM
    */
  constructor(arg1, arg2) {
    const element = arg1, config = arg2
    if(element === null || !this._isDomElement(element)) {
      throw new Error("IllegalArgument - arg1 is not a DOM element")
    }
    if(config === null) {
      this._setupDefaultSelector(element)
    } else {
      this._setupWithConfiguration(element, config)
    }
  }

  _setupDefaultSelector(arg1) {
    const element = arg1
    var selector = document.createElement('select')
    element.appendChild(selector)
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

  _setupWithConfiguration(arg1, arg2) {
    const element = arg1, config = arg2
    throw new Error("_setupWithConfiguration is not supported " +
                    "in this Version yet!");
  }

  //TODO: Move this function into new js file DomUtils
  _isDomElement(arg1) {
    const element = arg1
    try {
      return element instanceof HTMLElement
    } catch(e) {
      return (typeof element === "object") && (element.nodeType === 1) && (typeof element.style === "object") && (typeof element.ownerDocument === "object")
    }
  }

  /**
    * Remove every 'force-theme-*' class from every element in the DOM,
    * then add none or one new 'force-theme-*' class to toggle a theme.
    *
    * @param {string} arg1 newtheme: Name of the new theme-class to add. Use null or empty string to reset the theme.
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
    if (usecookie) {
      if(newtheme === "" || newtheme === null) {
        set_cookie("fs_theme", "", -1000)
      } else {
        set_cookie("fs_theme", newtheme, 1000)
      }
    }
  }
}
var _defaultdomelement = document.querySelectorAll("scheme-select")[0]
new Rescheme(_defaultdomelement, null)

export {
  Rescheme
}
