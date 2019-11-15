// User Model
import { Model } from '@vuex-orm/core'
import ObjModel from './ObjectModel'

export default class Box2 extends Model {
  // This is the name used as module name of the Vuex Store.
  static entity = 'box2'
  // List of all fields (schema) of the post model. `this.attr` is used
  // for the generic field type. The argument is the default value.
  //static baseEntity = 'object3d'

  static fields () {
    return {
      height_segments: this.attr(2),
      width_segments: this.attr(2),
      depth_segments: this.attr(2),
      height: this.attr(1),
      width: this.attr(1),
      depth: this.attr(1),
    }
  }

  static state ()  {
    return {
      persist: true,
      //repo: "engagement_label".  //replace with the engagement model for the repo. 
    }
  }

}