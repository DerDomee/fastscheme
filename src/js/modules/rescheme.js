class Rescheme {
  constructor(arg1, arg2, arg3) {
    const element = arg1, preset = arg2, config = arg3
    console.log(element, preset, config);
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

export {
  Rescheme
}
