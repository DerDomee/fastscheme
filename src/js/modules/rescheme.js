import { set_cookie, get_cookie } from './../utils/cookie'
import { isDomElement } from './../utils/domutils'


const SCHEME_COOKIE_NAME = 'fs_theme'
const DEFAULT_THEMES = [
  {name: 'Use system preference (@prefers-color-scheme)', class: ''},
  {name: 'Light Theme', class: 'force-theme-light'},
  {name: 'Dark Theme', class: 'force-theme-dark'},
  {name: 'Black Theme', class: 'force-theme-darkest'}]

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
      throw new Error('IllegalArgument - arg1 is not a DOM element')
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
                                 + ' select__wrapper').trim()
    var selector = document.createElement('select')
    element.appendChild(selectorwrapper)
    selectorwrapper.appendChild(selector)
    DEFAULT_THEMES.forEach(function(theme) {
      var option = document.createElement('option')
      if(theme.class === themecookie) {
        option.setAttribute('selected', 1)
      }
      option.appendChild(document.createTextNode(theme.name))
      option.setAttribute('theme-class', theme.class)
      selector.appendChild(option)
    })
    selector.addEventListener('change', () => {
      var selIndex = selector.options[selector.selectedIndex]
      var indexClass = selIndex.getAttribute('theme-class')
      Rescheme.changeTheme(indexClass)
    })
  }

  /**
    * Helper function for `changeTheme`
    */
  static _startThemeChangeTransition() {
    document.querySelectorAll('*').forEach(function(node) {
      var classes = node.className
      var clist = classes.split(' ')
      clist.push('theme-scheme-animate')
      node.className = clist.join(' ').trim()
    })
  }

  /**
    * Helper function for `changeTheme`
    */
  static _stopThemeChangeTransition() {
    document.querySelectorAll('*').forEach(function(node) {
      var classes = node.className
      var animationClassName = 'theme-scheme-animate'
      var clist = classes.split(' ').filter(function (c) {
        return c.lastIndexOf(animationClassName, 0) !== 0
      })
      node.className = clist.join(' ').trim()
    })
  }

  /**
    * Helper function for `changeTheme`
    */
  static _setThemeClass(node, newtheme) {
    var classes = node.className
    var classprefix = 'force-theme'
    var clist = classes.split(' ').filter(function (c) {
      return c.lastIndexOf(classprefix, 0) !== 0
    })
    clist.push(newtheme)
    node.className = clist.join(' ').trim()
  }

  /**
    * Helper function for `changeTheme`
    */
  static _setThemeCookie(themeName) {
    if(themeName === '' || themeName === null) {
      set_cookie(SCHEME_COOKIE_NAME, '', -1000)
    } else {
      set_cookie(SCHEME_COOKIE_NAME, themeName, 1000)
    }
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
    const newtheme = arg1, usecookie = arg2, animatetransition = arg3

    if(animatetransition) Rescheme._startThemeChangeTransition()

    var rootnode = document.querySelector(':root')
    Rescheme._setThemeClass(rootnode, newtheme)

    if (usecookie) Rescheme._setThemeCookie(newtheme)

    if(animatetransition) setTimeout(Rescheme._stopThemeChangeTransition, 500)
  }
}


var _defaultdomelement = document.querySelectorAll('scheme-select')[0]
new Rescheme(_defaultdomelement, null)
document.addEventListener('DOMContentLoaded', function() {
  var themecookie = get_cookie(SCHEME_COOKIE_NAME)
  if (themecookie !== '' &&
      themecookie !== null &&
      themecookie.startsWith('force-theme-')) {
    Rescheme.changeTheme(themecookie, false, false)
  }
})

export {
  Rescheme
}
