// User Model

export default class MeshMaterial{
  // This is the name used as module name of the Vuex Store.
  static entity = 'item'
  // List of all fields (schema) of the post model. `this.attr` is used
  // for the generic field type. The argument is the default value.
  static fields () {
    return {

      id: this.increment(),
      color: this.attr(0xffffff),
      metalness: this.attr(0),
      roughness: this.attr(0.5),
      clearCoat: this.attr(1.0),
      clearCoatRoughness: this.attr(1.0),
      reflectivity: this.attr(.5),
      polygonOffset: this.attr(true),
      polygonOffsetFactor: this.attr(1),
      polygonOffsetUnits: this.attr(1),
      wireframe: this.attr(true),
      transparent : this.attr(true),
      opacity : this.attr(.3) }
    }
  }

  static state ()  {
    return {
      persist: true,
      //repo: "engagement_label".  //replace with the engagement model for the repo. 
    }
  }

}