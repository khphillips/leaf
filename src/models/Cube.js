// User Model

export default class Cube {
  // This is the name used as module name of the Vuex Store.
  static entity = 'item'
  // List of all fields (schema) of the post model. `this.attr` is used
  // for the generic field type. The argument is the default value.
  static fields () {
    return {
      id: this.increment(),
      width: this.attr(1),
      height: this.attr(1),
      depth: this.attr(1),
      x : this.attr(0),
      y : this.attr(0),
      z : this.attr(0),
      rotate_y : this.attr(0),
      rotate_x : this.attr(0),
      rotate_z : this.attr(0),
      material : this.attr('red'),
    }
  }

  static state ()  {
    return {
      persist: true,
      //repo: "engagement_label".  //replace with the engagement model for the repo. 
    }
  }

}