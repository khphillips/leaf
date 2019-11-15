// User Model
import { Model } from '@vuex-orm/core'
import ObjModel from './ObjectModel'

export default class LeafBlade extends Model {
  // This is the name used as module name of the Vuex Store.
  static entity = 'leafblade'
  // List of all fields (schema) of the post model. `this.attr` is used
  // for the generic field type. The argument is the default value.
  //static baseEntity = 'object3d'

  static fields () {
    return {
      ...super.fields(),
      distort_x: this.attr(0),
      distort_y: this.attr(0),
      distort_z: this.attr(0),
      age : this.attr(1)
    }
  }

  static state ()  {
    return {
      persist: true,
      
      length: 0,
      num_veins : 3,
      vein_length : 3,
      vein_reverse_arc : false,

      vein_distribution_curve_x1 : 46,
      vein_distribution_curve_y1 : 6,
      vein_distribution_curve_min : 0,
      vein_distribution_curve_max : 1,
      vein_angle_curve_x1 : .5,
      vein_angle_curve_y1 : .35,
      vein_angle_curve_min : .17,
      vein_angle_curve_max : .6,
      vein_angle_length_curve_x1 : .45,
      vein_angle_length_curve_y1 : .32,
      vein_angle_length_curve_x2 : .7,
      vein_angle_length_curve_y2 : .07,
      vein_angle_length_curve_repeat : 1,
      vein_z_curve_x1 : .4,
      vein_z_curve_y1 : .07,
      vein_z_curve_x2 : .83,
      vein_z_curve_y2 : .33,
      vein_z_curve_max : .5,
      //repo: "engagement_label".  //replace with the engagement model for the repo. 
    }
  }

}