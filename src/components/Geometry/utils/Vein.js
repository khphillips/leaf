import * as THREE from 'three';
import g from './geometryFunctions'
import e from './easingFunctions';

export default class Vein { 

  constructor(length, angle, y, name, reverse, zcurve) {
    this.length = length;
    this.angle = angle;
    this.y = y;
    this.name = name;
    this.reverse = reverse;
    this.zcurve = zcurve;
    this.vein_arc = this.length * 3;
    this.getLineGeometry3(0x000000);
    this.vein_arc = 7;
    this.resolution = 12;
  }


  vein_vertices(){
      var l = this.line_group.getObjectByName('line')
      if (typeof l != undefined){
        return l.geometry.vertices;
      }
      return [];
  }


  getLine(t){ // pass time 0 to 1
      if (typeof t == 'undefined'){
        t = 1;
      }
      var r = this.length * e.easeOutCubic(t);
      var p = g.findPointOnCircle(0, this.y, r, 90 - this.angle);
      return{
        x1 : 0,
        y1 : this.y,
        x2 : p.x,
        y2 : p.y
      }
  }
  getLineGeometry3(line_color, resolution){
      var line_material = new THREE.LineBasicMaterial( { color: line_color } ); 
      this.line_group = new THREE.Group();
      if (typeof resolution == 'undefined'){
        resolution = this.resolution;
      }
      var l = this.getLine(1);
      var arc_geometry = g.lineGeometry3(l.x1,l.y1, l.x2,l.y2, this.vein_arc, resolution, this.reverse, this.zcurve);
      var line = new THREE.Line( arc_geometry, line_material );
      line.name = 'line'
      this.line_group.add(line);
      this.line_group.name = this.name;
      return this.line_group;  
  }
  getLineGeometry(line_color){
      this.line_group = new THREE.Group();
      var l = this.getLine()
      var line_material = new THREE.LineBasicMaterial( { color: line_color } ); 
      var line = new THREE.LineLoop( g.lineGeometry(l.x1, l.y1, l.x2, l.y2), line_material );
      line.name = 'line'
      this.line_group.add(line);
      this.line_group.name = this.name;
      return this.line_group;  
  }
  updateLineGeometry(){
      var line = this.line_group.getObjectByName('line');
      line.geometry.dispose();
      var l = this.getLine()
      line.geometry = g.lineGeometry(l.x1, l.y1, l.x2, l.y2)
  }
  updateLineGeometry3(resolution){
      if (typeof resolution == 'undefined'){
        resolution = this.resolution;
      }
      var line = this.line_group.getObjectByName('line');
      line.geometry.dispose();
      var l = this.getLine(1);
      line.geometry = g.lineGeometry3(l.x1,l.y1, l.x2,l.y2, this.vein_arc, resolution, this.reverse, this.zcurve);
  }

}

