import Vein from './Vein'

import * as THREE from 'three';
import g from './geometryFunctions'
import e from './easingFunctions';
import LeafBladeModel from '@/models/LeafBlade'

export default class LeafBlade{

  constructor(cfg, name){
    this.cfg = cfg
    this.cfg_indiv = cfg;
    this.name = name
    this.line_group = {}
    this.leaf_blade = {}
    this.leaf_actual_height = 0
    this.meshes = {}
    this.bones =[]
    this.veins = [];
    this.main_vein = {}
    this.resolution = this.cfg.length * 10
    this.distribution_pts = this._distribution_pts();
    this.length_pts = this._length_pts()
    this.angle_pts = this._angle_pts();
    this.makeVeins(this.cfg.num_veins);
    //console.log(this.veins)
  }


    //sets the configuration for each vein 
    // used by the dom template above to pass the values to the vein object. 
  _distribution_pts(){
    var control_points = g.getRampPoints(this.cfg.vein_distribution_curve_x1, this.cfg.vein_distribution_curve_y1, this.cfg.vein_distribution_curve_x2, this.cfg.vein_distribution_curve_y2, false, this.cfg.vein_distribution_curve_min, this.cfg.vein_distribution_curve_max);
     return g.createEasePoints(0, 0, 1, 1, control_points, this.cfg.num_veins + 1)
  }
  _length_pts(){
      var control_points = g.getRampPoints(this.cfg.vein_length_curve_x1, this.cfg.vein_length_curve_y1, this.cfg.vein_length_curve_x2, this.cfg.vein_length_curve_y2, true, this.cfg.vein_length_curve_min, this.cfg.vein_length_curve_max, this.cfg.vein_length_curve_repeat);
      //repeat the length curve if config says so... creates undulations on leaf profile. 
      return g.createEasePoints(0, 0, 1, 1, control_points, this.cfg.num_veins + 1)
  }
  _angle_pts(){
       var control_points = g.getRampPoints(this.cfg.vein_angle_curve_x1, this.cfg.vein_angle_curve_y1, this.cfg.vein_angle_curve_x2, this.cfg.vein_angle_curve_y2, false, this.cfg.vein_angle_curve_min, this.cfg.vein_angle_curve_max, 1); 
      return g.createEasePoints(0, 0, 1, 1, control_points, this.cfg.num_veins + 1).reverse()
  }


  //methods
  findOffsetY(i){
      var prev_offset = 0;
      //we need to know the previous offset so that we don't overlap any... may not be strictly necessary anymore as the overlap may be ok aesthetically or not. 
      for (var c = 0; c < this.cfg.num_veins; c++){
        var offset = this.distributionRules(this.distribution_pts[c+1].y * this.cfg.length, prev_offset);
        if (c == i){
          return offset;
        }
        prev_offset = offset;
      }
  }
  findAngle(i){
      return this.angle_pts[i+1].y * 180
  }
  findLength(i){
      console.log('test', this.length_pts);
      return this.length_pts[i+1].y * this.cfg.vein_length
  }
    //this is the veins in between the config veins
    //we build the vectors and faces from this.
  vein_easings(resolution){
      if (typeof resolution == 'undefined'){
        resolution = this.resolution;
      }
      var veins = [];
      //interpolate between bottom main vein and bottom vein. 
      var v1 = this.veins[0].vein_vertices();
      for (var ei=0; ei < resolution; ei++){
        var vein_ease = [];
        var t = (ei + 1) / (resolution + 1);
        for (var vi=0; vi < v1.length; vi++){
          vein_ease.push(
              new THREE.Vector3(
                  v1[vi].x * e.easeOutCubic(t),
                  v1[vi].y * t,
                  v1[vi].z * e.easeOutCubic(t),
                )
            )
        }
        veins.push(vein_ease)
      }
      if (this.veins.length > 1){
        for (var i = 0; i < this.veins.length - 1; i++){
          v1 = this.veins[i].vein_vertices();
          veins.push(v1);
          var v2 = this.veins[i+1].vein_vertices();
          for (var ei=0; ei < resolution; ei++){
            vein_ease = [];
            t = (ei + 1) / (resolution + 1);
            for (var vi=0; vi < v1.length; vi++){
              vein_ease.push(
                new THREE.Vector3(
                    v1[vi].x + ((v2[vi].x - v1[vi].x) * e.easeInOutCubic(t)),
                    v1[vi].y + ((v2[vi].y - v1[vi].y) * t),
                    v1[vi].z + ((v2[vi].z - v1[vi].z) * e.easeInOutCubic(t)),
                  )
              )
            }
            veins.push(vein_ease);
          }
        }
        veins.push(v2);
      }else{
        v2 = v1;
      }
      for (var ei=0; ei < resolution; ei++){
        var vein_ease = [];
        var t = (ei + 1) / (resolution + 1);
        for (var vi=0; vi < v2.length; vi++){
          vein_ease.push(
              new THREE.Vector3(
                  v2[vi].x - (v2[vi].x * e.easeInCubic(t)),
                  v2[vi].y + ((this.cfg.length - v2[vi].y) * t ), //- v1[vi].y) * t),
                  v2[vi].z - (v2[vi].z * e.easeInCubic(t)),
                )
            )
        }
        veins.push(vein_ease)
      }
      //console.log(veins)
      return veins;
    }

    makeVeins(num){
      this.veins = [];
      for (var i = 0; i < num; i++){
        this.veins.push(this.makeVein(i));
      }
    }
    makeVein(i){
      var length = this.findLength(i-1);
      var angle = this.findAngle(i-1);
      var y = this.findOffsetY(i-1)
      var name = 'vein_' + (i-1)
      var reverse = this.cfg.vein_reverse_arc;
      var zcurve = {
        x1 : this.cfg.vein_z_curve_x1,
        y1 : this.cfg.vein_z_curve_y1,
        x2 : this.cfg.vein_z_curve_x2,
        y2 : this.cfg.vein_z_curve_y2,
        max : this.cfg.vein_z_curve_max,
      }
      return new Vein(length, angle, y, name, reverse, zcurve);
    }
    createLeafBladeGeometry(){
      //create all the veins based on num_veins...
      var geometry = this.createBladeGeometry( );
      var sizing = this.getSizing();
      this.bones = this.createBones( sizing );
      this.bones.name = "blade bones";
      //this.meshes = this.createMesh( geometry, bones );
      this.meshes = this.createSimpleMesh( geometry, this.bones);
      this.meshes[0].scale.multiplyScalar( 1 );
      this.meshes[1].scale.multiplyScalar( 1 );

      //this.object.name = "leaf_blade";
      //this.object.add(this.meshes[0]);
      //this.object.add(this.meshes[1]);
      //return this.object; 
      return geometry;
    }
    updateLeafBlade(){
      var geometry = this.createBladeGeometry();
      var sizing = this.getSizing();
      var m = this.object.getObjectByName('mesh');
      m.geometry = geometry;
      var w = this.object.getObjectByName('wire');
      w.geometry = geometry;
    }
    createBladeGeometry(){
      var data = this.createBladeVertices();
      /*
      var geometry = new THREE.BufferGeometry();
      geometry.setIndex( data.faces );
      geometry.addAttribute( 'normal', new THREE.Float32BufferAttribute( data.normals, 3 ) );
      geometry.addAttribute( 'position', new THREE.Float32BufferAttribute( data.vertices, 3 ) );
      geometry.computeBoundingSphere();
      console.log(geometry)
      return geometry;
      */
      var _geometry = new THREE.Geometry();
      _geometry.vertices = data.vertices;
      this.setActualHeight(_geometry.vertices)
      var sizing = this.getSizing();
      _geometry.faces = data.faces;
      _geometry.mergeVertices();
      _geometry.computeVertexNormals(false);
      _geometry.computeFaceNormals();
      var geometry = new THREE.BufferGeometry();
      geometry.fromGeometry( _geometry );
      geometry.normalizeNormals()
      geometry.dynamic = true;
      //return geometry;
      //position.dynamic = true
      
      var vertex = new THREE.Vector3();
      var skinIndices = [];
      var skinWeights = [];
      var position = geometry.getAttribute('position')
      for ( var i = 0; i < position.count; i ++ ) {

        vertex.fromBufferAttribute( position, i );

        var y = ( vertex.y  );

        var skinIndex = Math.abs(Math.floor( y / sizing.segmentHeight )) ;
        var skinWeight = Math.abs(( y % sizing.segmentHeight ) / sizing.segmentHeight);
        skinIndices.push( skinIndex, skinIndex + 1, 0, 0 );
        //skinWeights.push( easeInOutQuad(1-skinWeight), easeInOutQuad(skinWeight), 0, 0 );
        skinWeights.push( 1 - skinWeight, skinWeight, 0, 0 );
      }

      geometry.addAttribute( 'skinIndex', new THREE.Uint16BufferAttribute( skinIndices, 4 ) );
      geometry.addAttribute( 'skinWeight', new THREE.Float32BufferAttribute( skinWeights, 4 ) );
     
      //geometry.normalizeNormals();
      return geometry;
    }
    createBladeVertices(){
      return g.createVerticesFromPathArray(this.vein_easings());
    }

    setActualHeight(vertices){
      //console.log(vertices)
      this.leaf_actual_height = 0;
      for (var i=0; i < vertices.length; i++){
        if (vertices[i].y > this.leaf_actual_height){
          this.leaf_actual_height = vertices[i].y;
        }
      }
    }
    createBones( sizing ) {
      var bones = [];
      var prevBone = new THREE.Bone();
      bones.push( prevBone );
      prevBone.position.y = 0;
      for ( var i = 0; i <= sizing.segmentCount + 1; i ++ ) {
        var bone = new THREE.Bone();
        bone.position.y = sizing.segmentHeight;
        bones.push( bone );
        prevBone.add( bone );
        prevBone = bone;
        //console.log(bone);
      }
      //console.log(bones);
      return bones;
    }
    updateBones(sizing){
      //update this.bones
      for ( var i = 0; i <= sizing.segmentCount + 1; i ++ ) {
        this.bones[i].position.y = sizing.segmentHeight;
      }
    }
    createMesh( geometry, bones ) {
      //console.log('creating meshes');
      var material_wire = new THREE.MeshStandardMaterial( {
        skinning: true,
        color: 0xffffff,
        emissive: 0x990000,
        side: THREE.DoubleSide,
        flatShading: false,
        roughness: 0,
        metalness: .75,
        wireframe: true,
        polygonOffset: true,
        polygonOffsetFactor: 2,
        polygonOffsetUnits: 1,
        visible:true
      } );
      var material = new THREE.MeshStandardMaterial( {
        skinning: true,
        color: 0x00dd99,
        emissive: 0x000000,
        side: THREE.DoubleSide,
        flatShading: true,
        roughness: 0,
        metalness: 0,
        polygonOffset: true,
        polygonOffsetFactor: 1,
        polygonOffsetUnits: 1,
      } );
      
      var mesh = new THREE.SkinnedMesh( geometry, material );
      //console.log(geometry)
      var skeleton = new THREE.Skeleton( bones );
      mesh.add( bones[ 0 ] );
      mesh.bind( skeleton );

      var mesh_wire = new THREE.SkinnedMesh( geometry,  material_wire );
      var skeleton = new THREE.Skeleton( bones );
      mesh_wire.add( bones[ 0 ] );
      mesh_wire.bind( skeleton );

      mesh.castShadow = true;
      mesh.receiveShadow = true;

      //skeletonHelper = new THREE.SkeletonHelper( mesh );
      //skeletonHelper.material.linewidth = 2;
      //scene.add( skeletonHelper );

      return [mesh, mesh_wire];

    }
    createSimpleMesh( geometry, bones) {
      //console.log('creating meshes');
      var material_wire = new THREE.MeshStandardMaterial( {
        skinning: true,
        color: 0x00ff00,
        emissive: 0x000000,
        side: THREE.DoubleSide,
        flatShading: true,
        roughness: .5,
        metalness: 1,
        wireframe: true,
        polygonOffset: false,
        polygonOffsetFactor: 2,
        polygonOffsetUnits: 1,
        //depthTest:true,
        visible:false,
        //transparent :true,
        //blending: THREE.MultiplyBlending,
      } );
      var material = new THREE.MeshStandardMaterial( {
        skinning: true,
        color: 0x00dd99,
        emissive: 0x000000,
        side: THREE.DoubleSide,
        flatShading: false,
        dithering :true,
        roughness: .455,
        metalness: .3,
        polygonOffset: true,
        polygonOffsetFactor: 1,
        polygonOffsetUnits: 1,
        //depthTest:true,
        visible:true
      } );
      
      var mesh = new THREE.SkinnedMesh( geometry, material );
      mesh.name ='mesh'
      var skeleton = new THREE.Skeleton( bones );
      mesh.add( bones[ 0 ] );
      mesh.bind( skeleton );
      //var a = new THREE.Geometry().fromBufferGeometry( mesh.geometry );
      //a.mergeVertices();
      //a.computeVertexNormals()
      //a.computeVertexNormals();
      //geometry.fromGeometry( a );
      //mesh.geometry.fromGeometry( a )
      var mesh_wire = new THREE.SkinnedMesh( geometry,  material_wire );
      var skeleton = new THREE.Skeleton( bones );
      mesh_wire.add( bones[ 0 ] );
      mesh_wire.bind( skeleton );
      mesh_wire.name = "wire"
      mesh.castShadow = true;
      mesh.receiveShadow = true;

      //skeletonHelper = new THREE.SkeletonHelper( mesh );
      //skeletonHelper.material.linewidth = 2;
      //scene.add( skeletonHelper );

      return [mesh, mesh_wire];

    }
    getSizing(){
      //CAREFUL!! if and of vertexes is beyond the max height of all the bones you will get goofyness. 
      //we should have a "leaf" height which is the height of the leaf and bones... 
      var height = this.leaf_actual_height;
      var segmentCount = 20;
      var segmentHeight = height / segmentCount;
      var halfHeight = height * 0.5;

      var sizing = {
        segmentHeight: segmentHeight,
        segmentCount: segmentCount,
        height: height,
        halfHeight: halfHeight
      };
      return sizing;
    }
    updateBones(){
      for ( var i = 0; i < this.meshes[0].skeleton.bones.length; i ++ ) {
        var t = i / this.meshes[0].skeleton.bones.length /2;
        this.meshes[0].skeleton.bones[ i ].rotation.z = this.cfg.rotation_z * t;
        this.meshes[0].skeleton.bones[ i ].rotation.x = this.cfg.rotation_x * t ;
        this.meshes[0].skeleton.bones[ i ].rotation.y = this.cfg.rotation_y * t ;
        //if (typeof this.cfg.bone_scale['bone' + i] != 'undefined'){
        //  this.meshes[0].skeleton.bones[ i ].scale.x = this.cfg.bone_scale['bone' + i];
        //}
      }
    }

    distributionRules(offset, prev_offset){
      if (offset < prev_offset){
        offset = prev_offset;
      }
      if (offset > this.cfg.length){
        offset = this.cfg.length
      }
      if (offset < 0){
        offset = 0;
      }
      return offset;
    }

}

