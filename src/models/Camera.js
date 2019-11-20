// User Model
import ObjModel from './ObjectModel'

export default class Camera extends ObjModel {
  // This is the name used as module name of the Vuex Store.
  static entity = 'camera'
  // List of all fields (schema) of the post model. `this.attr` is used
  // for the generic field type. The argument is the default value.
  //static baseEntity = 'object3d'

  static fields () {
    return {
      ...super.fields(),
      zoom: this.attr(1),
      fov: this.attr(50),
      target_x: this.attr(0),
      target_y: this.attr(0),
      target_z: this.attr(0),
    }
  }

  static state ()  {
    return {
      persist: true,
      //repo: "engagement_label".  //replace with the engagement model for the repo. 
    }
  }

  get rotation () {
    return `${this.rotate_x} ${this.rotate_y} ${this.rotate_z}`
  }

  get orbitTarget() {
    return `${this.target_x} ${this.target_y} ${this.target_z}`
  }

}