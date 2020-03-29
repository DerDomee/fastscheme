class Rescheme {
  constructor(arg1, arg2, arg3) {
    const element = arg1, preset = arg2, config = arg3
    console.log(element, preset, config);
  }

  changeTheme(arg1) {
    const newtheme = arg1
    document.querySelectorAll('*').forEach(function(node) {
      var classes = node.className
      var clist = classes.split(/\s+/)
      if(clist.length > 0) console.log(node + " has classes " + clist)
      for(var i = clist.length-1; 0; i-1) {
        if(clist[i].startsWith("force-theme-")) {
          console.log("Removing class " + clist[i] + " from " + node);
          // TODO: Removing doesnt work yet. HUH?
          clist = clist.splice(i, 1);
        }
      }
      clist.push(newtheme)
      node.className= clist.join(" ")
    })
  }
}

export {
  Rescheme
}
