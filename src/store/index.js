import Vue from 'vue'
import Vuex from 'vuex'
import VuexORM from '@vuex-orm/core'

import ObjectModel from '../models/ObjectModel'
import BoxModel from '../models/Box'
import Camera from '../models/Camera'
import LeafBladeModel from '../models/LeafBlade'
//import GitStore from 'vuex-gitstore'
import GitStore from './gitstore/index'

Vue.use(Vuex)

const database = new VuexORM.Database()

database.register(ObjectModel)
database.register(BoxModel)
database.register(LeafBladeModel)
database.register(Camera)


const store = new Vuex.Store({
  plugins: [
  	VuexORM.install(database),
  	GitStore.install({
  		key : 'entities', 
  		repo : 'leaf',
  		commit : false
  	})
  	]
})

export default store