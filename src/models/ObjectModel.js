import { Model } from '@vuex-orm/core'

export default class ObjectModel extends Model {
  // This is the name used as module name of the Vuex Store.
  static entity = 'object3d'

  static fields () {
    return {
      id: this.increment(),
      material : this.attr('white'),
      x : this.attr(0),
      y : this.attr(0),
      z : this.attr(0),
      rotate_x : this.attr(0),
      rotate_y : this.attr(0),
      rotate_z : this.attr(0),
    }
  }

  get position () {
    return `${this.x} ${this.y} ${this.z}`
  }

  get rotation () {
    return `${this.rotate_x} ${this.rotate_y} ${this.rotate_z}`
  }

  static afterCreate (model) {
    //save to file and then add commit
  }

  static afterUpdate (model) {
    //save to file and then add commit
  }


}