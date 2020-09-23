import { set_cookie, get_cookie } from './../utils/cookie'
import { isDomElement } from './../utils/domutils'


const SCHEME_COOKIE_NAME = "fs_theme"
const DEFAULT_THEMES = [
  {name: "Use system preference (@prefers-color-scheme)", class: ""},
  {name: "Light Theme", class: "force-theme-light"},
  {name: "Dark Theme", class: "force-theme-dark"},
  {name: "Black Theme", class: "force-theme-darkest"}]

/**
  * Rescheme Class providing the selector for scheme-overrides.
  * The function of @prefers-color-scheme works without any javascript,
  * this class only exists for manual overriding of the theme by the user.
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
    if(element === null || ! isDomElement(element)) {
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
    var themecookie = get_cookie(SCHEME_COOKIE_NAME)
    var selectorwrapper = document.createElement('div')
    selectorwrapper.className = (selectorwrapper.className
                                 + " select__wrapper").trim()
    var selector = document.createElement('select')
    element.appendChild(selectorwrapper)
    selectorwrapper.appendChild(selector)
    DEFAULT_THEMES.forEach(function(theme) {
      var option = document.createElement('option')
      if(theme.class === themecookie) {
        option.setAttribute("selected", 1)
      }
      option.appendChild(document.createTextNode(theme.name))
      option.setAttribute('theme-class', theme.class)
      selector.appendChild(option)
    })
    selector.addEventListener("change", () => {
      var selIndex = selector.options[selector.selectedIndex]
      var indexClass = selIndex.getAttribute('theme-class')
      Rescheme.changeTheme(indexClass)
    })
  }

  _setupWithConfiguration(arg1, arg2) {
    const element = arg1, config = arg2
    throw new Error("_setupWithConfiguration is not supported " +
                    "in this Version yet!");
  }


  /**
    * Remove every 'force-theme-*' class from every element in the DOM,
    * then add none or one new 'force-theme-*' class to toggle a theme.
    *
    * @param {string} arg1 newtheme: Name of the new theme-class to add. Use null or empty string to reset the theme.
    * @param {boolean} arg2 usecookie: If the scheme change should be saved in a persistent cookie that loads the selected scheme on page reload
    * @param {boolean} arg3 animatetransition: If the transition should be animated
    */
  static changeTheme(arg1, arg2 = true, arg3 = true) {
    console.log("Changing theme...");
    const newtheme = arg1, usecookie = arg2, animatetransition = arg3
    if(animatetransition) {
      console.log("  Changing theme with animated transition...");
      document.querySelectorAll('*').forEach(function(node) {
        var classes = node.className
        var clist = classes.split(" ")
        clist.push("theme-scheme-animate")
        node.className = clist.join(" ").trim()
      })
      console.log("  Animation initialized!");
    }
    console.log("  Changing the actual theme now...");
    var rootnode = document.querySelector(':root')
    var root_classes = rootnode.className
    var root_classprefix = "force-theme"
    var root_clist = root_classes.split(" ").filter(function (c) {
      return c.lastIndexOf(root_classprefix, 0) !== 0
    })
    root_clist.push(newtheme)
    rootnode.className = root_clist.join(" ").trim()
    console.log("  Successfully changed the actual theme!");

    if (usecookie) {
      console.log("  Changing theme cookie...");
      if(newtheme === "" || newtheme === null) {
        set_cookie(SCHEME_COOKIE_NAME, "", -1000)
      } else {
        set_cookie(SCHEME_COOKIE_NAME, newtheme, 1000)
      }
      console.log("  Changed theme cookie!");
    }
    if(animatetransition) {
      setTimeout(function () {
        document.querySelectorAll('*').forEach(function(node) {
          var classes = node.className
          var classprefix = "theme-scheme-animate"
          var clist = classes.split(" ").filter(function (c) {
            return c.lastIndexOf(classprefix, 0) !== 0
          })
          node.className = clist.join(" ").trim()
        })
      }, 500)
    }
  }
}
var _defaultdomelement = document.querySelectorAll("scheme-select")[0]
new Rescheme(_defaultdomelement, null)
document.addEventListener("DOMContentLoaded", function() {
  var themecookie = get_cookie(SCHEME_COOKIE_NAME)
  if (themecookie !== "" &&
      themecookie !== null &&
      themecookie.startsWith("force-theme-")) {
    Rescheme.changeTheme(themecookie, false, false)
  }
})

export {
  Rescheme
}
