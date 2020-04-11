import {isDomElement, elemHasId, elemGetId} from './../utils/domutils'

class HeadingAnchor {

  constructor(arg1) {
    const element = arg1
    if(!isDomElement(element)) {
      console.error("Tried to create HeadingUtil on a object that is not an "
                    + "element in the dom");
      return
    }
    if(elemHasId(element)) {
      element.addEventListener("mouseenter", function() {
        var headingspan = document.createElement("span")
        headingspan.className = "heading-link-overlay"
        element.appendChild(headingspan)
        var headinglink = document.createElement("a")
        var baseurl = document.location.toString().split("#")[0]
        headinglink.href = baseurl + "#" + elemGetId(element)
        headinglink.appendChild(document.createTextNode("#"))
        headingspan.appendChild(headinglink)
      })
      element.addEventListener("mouseleave", function() {
        element.removeChild(element.lastElementChild)
      })
    }
  }
}

const allHeadingElements = document.querySelectorAll("h1, h2, h3, h4, h5, h6")
allHeadingElements.forEach(function(elem) {
  new HeadingAnchor(elem)
});


export {
  HeadingAnchor
}
