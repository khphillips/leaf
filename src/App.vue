<template>
  <v-app dark id="inspire" class="text3--text">

    <v-navigation-drawer v-model="drawerRight" width="30%" app clipped hide-overlay stateless right class="primary darken-1">
      Console
    </v-navigation-drawer>

    <v-app-bar dense app clipped-right class="primary text3--text" dark>
      <v-app-bar-nav-icon color="text3" @click.stop="drawer = !drawer" />
      <v-toolbar-title>DARKNOTE</v-toolbar-title>
      <v-spacer />
      <v-btn small dark class="primary darken-1" fab @click.stop="drawerRight = !drawerRight">
        <v-icon small>fas fa-terminal</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" width="150px" app class="primary darken-1 text1--text">
      <v-list dense>
        <v-list-item :to="{ name: 'canvas', params: { userId: 123 }}">
          <v-list-item-action>
            <v-icon small>fas fa-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Canvas</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="about">
          <v-list-item-action>
            <v-icon small>fas fa-info</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>About</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click.stop="left = !left">
          <v-list-item-action>
            <v-icon small>fas fa-sign-out-alt</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Open Temporary Drawer</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click.stop="addBox">
          <v-list-item-action>
            <v-icon small>fas fa-sign-out-alt</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Add</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-navigation-drawer v-model="left" fixed temporary class="primary darken-2">
      <camera-controls :value="1"></camera-controls>
      <blade-controls></blade-controls>
    </v-navigation-drawer>

    <v-content>
      <v-container class="fill-height" fluid>
        <router-view class="text1--text"></router-view>
      </v-container>
    </v-content>

    <v-navigation-drawer v-model="right" fixed right temporary  class="primary darken-2"/>

    <v-system-bar>
      <v-footer app color="primary" class="text3--text">
        <git-store-info></git-store-info>
        <v-spacer />
        <span>&copy; 2019</span>
      </v-footer>
    </v-system-bar>
  </v-app>

  
</template>

<script>

import GitStoreInfo from './components/utils/GitStoreInfo'
import LeafBladeModel from '@/models/LeafBlade'
import BoxModel from '@/models/Box'
import CameraModel from '@/models/Camera'
import CameraControls from '@/components/CameraControls'
import BladeControls from '@/components/BladeControls'

export default {
  props: {
    source: String,
  },
  data: () => ({
    drawer: null,
    drawerRight: null,
    right: false,
    left: false,
    camera : {
      target_x : 0,
      target_y : 0,
      target_z : 0,
      x : 0,
      y : 0,
      z : 0,
    }
  }),
  created () {
      this.$vuetify.theme.dark = true;
      this.$router.push('/');
  },
  methods : {
    addBox : function(){
      var box = new LeafBladeModel();
      box.x = Math.floor(Math.random() * 10);
      box.y = Math.floor(Math.random() * 10);
      box.z = Math.floor(Math.random() * 10);
      box.$save();
      var box = new BoxModel();
      box.x = Math.floor(Math.random() * 10);
      box.y = Math.floor(Math.random() * 10);
      box.z = Math.floor(Math.random() * 10);
      box.$save();
      var box = new CameraModel();
      box.x = Math.floor(Math.random() * 10);
      box.y = Math.floor(Math.random() * 10);
      box.z = Math.floor(Math.random() * 10);
      box.$save();
    }
  },
  components : {
    GitStoreInfo,
    CameraControls,
    BladeControls
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Nunito+Sans|Roboto+Slab&display=swap');
body .v-application,
body {
  font-family: 'Nunito Sans', serif;
  font-size: 80%;
  letter-spacing: .05em;
  line-height: 1.5em;
}
body h1,
body h2,
body h3,
body h4,
body h5,
body h6{
  line-height: 1.5em;
  margin : 2em 0 .25em;
}
body h1,body h4{
  text-transform: uppercase;
  letter-spacing: .14em
}
body .v-application code {
    background-color: #16130e;
    color: #cdc7bb;
    padding:10px;
}

</style>
