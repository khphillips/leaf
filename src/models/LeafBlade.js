// User Model
import { Model } from '@vuex-orm/core'
import ObjModel from './ObjectModel'

export default class LeafBlade extends ObjModel{
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
      age : this.attr(1),

      length: this.attr(4),
      num_veins : this.attr(3),
      vein_length : this.attr(3),
      vein_reverse_arc : this.attr(false),

      vein_distribution_curve_x1 : this.attr(46),
      vein_distribution_curve_y1 : this.attr(6),
      vein_distribution_curve_min : this.attr(0),
      vein_distribution_curve_max : this.attr(1),
      vein_angle_curve_x1 : this.attr(.5),
      vein_angle_curve_y1 : this.attr(.35),
      vein_angle_curve_min : this.attr(.17),
      vein_angle_curve_max : this.attr(.6),
      vein_length_curve_x1 : this.attr(.45),
      vein_length_curve_y1 : this.attr(.32),
      vein_length_curve_x2 : this.attr(.7),
      vein_length_curve_y2 : this.attr(.07),
      vein_length_curve_repeat : this.attr(1),
      vein_z_curve_x1 : this.attr(.4),
      vein_z_curve_y1 : this.attr(.07),
      vein_z_curve_x2 : this.attr(.83),
      vein_z_curve_y2 : this.attr(.33),
      vein_z_curve_max : this.attr(.5),
    }
  }

  static state ()  {
    return {
      persist: true,
      //repo: "engagement_label".  //replace with the engagement model for the repo. 
    }
  }

}