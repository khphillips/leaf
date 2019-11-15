const pow = Math.pow;
const sqrt = Math.sqrt;
const sin = Math.sin;
const cos = Math.cos;
const PI = Math.PI;
const c1 = 1.70158;
const c2 = c1 * 1.525;
const c3 = c1 + 1;
const c4 = ( 2 * PI ) / 3;
const c5 = ( 2 * PI ) / 4.5;

import * as THREE from 'three';
import e from './easingFunctions';

const geometryFunctions = {
	findPointOnCircle(originX, originY , radius, angleDegrees) {
		var angleRadians = PI * 2 * angleDegrees / 360;
        var newX = (radius * Math.cos(angleRadians) + originX);
        var newY = (radius * Math.sin(angleRadians) + originY);
        return {"x" : newX, "y" : newY}
	},
	findPointOnCircleRadians(originX, originY , radius, angleRadians) {
        var newX = (radius * Math.cos(angleRadians) + originX);
        var newY = (radius * Math.sin(angleRadians) + originY);
        return {"x" : newX, "y" : newY}
	},
	findAngleOfPointOnCircle(x, y, cx, cy){
		var angle = Math.atan2(cy - y, x - cx);
    	return angle;
	},
	findDistance(x1, y1, x2, y2){
		return Math.sqrt(((x2 - x1)*(x2 - x1)) + ((y2 - y1)*(y2 - y1)));
	},

	radiansToDegrees(r){
		return r * 180/Math.PI
	},
	degreesToRadians(d){
		return d * Math.PI/180;
	},

	find_angle(A,B_center,C) { //returns radians
	    var AB = Math.sqrt(Math.pow(B_center.x-A.x,2)+ Math.pow(B_center.y-A.y,2));    
	    var BC = Math.sqrt(Math.pow(B_center.x-C.x,2)+ Math.pow(B_center.y-C.y,2)); 
	    var AC = Math.sqrt(Math.pow(C.x-A.x,2)+ Math.pow(C.y-A.y,2));
	    return Math.acos((BC*BC+AB*AB-AC*AC)/(2*BC*AB));
	},

	findRadiusWithWidthHeight(w, h){
		return (h/2) + ((w / 2) / (8 * H));
	},

	findCircleCenter(x1, y1, x2, y2, r, neg){
		//find X candidates
		var radius2 = r * r;
		var q = Math.sqrt(((x2 - x1) * (x2 - x1)) + ((y2 - y1) * (y2 - y1)))
		var x3 = (x1 + x2) / 2;
		var y3 = (y1 + y2) / 2;
		if (neg){
			var c_x = x3 + Math.sqrt(radius2 - ((q / 2) * (q / 2))) * ((y1 - y2) / q);
			var c_y = y3 + Math.sqrt(radius2 - ((q / 2) * (q / 2))) * ((x2 - x1) / q);
		}else{
			c_x = x3 - Math.sqrt(radius2 - ((q / 2) * (q / 2))) * ((y1 - y2) / q);
			c_y = y3 - Math.sqrt(radius2 - ((q / 2) * (q / 2))) * ((x2 - x1) / q);
		}
		return {x:c_x, y:c_y};
	},

	squareGeometry(x, y, width, height){
		var geometry = new THREE.Geometry();
		geometry.vertices.push(
			new THREE.Vector3(x, y, 0),
			new THREE.Vector3(x, y + height, 0),
			new THREE.Vector3(x + width, y + height, 0),
			new THREE.Vector3(x + width, y, 0)
		)
		return geometry;
	},

	lineGeometry(x1, y1, x2, y2){
		var geometry = new THREE.Geometry();
		geometry.dynamic = true;
		geometry.vertices.push(
			new THREE.Vector3(x1, y1, 0),
			new THREE.Vector3(x2, y2, 0),
		)
		return geometry;
	},

	arcGeometry(x1, y1, x2, y2, r, count, reverse){
		if (typeof reverse == 'undefined'){
			reverse = false;
		}
		if (typeof count == 'undefined'){
			count = 5;
		}
		var center = this.findCircleCenter(x1, y1, x2, y2, r, reverse);
		var angle = this.find_angle(
			{x:x1, y:y1},
			center,
			{x:x2, y:y2},
		)
		var start_angle = this.findAngleOfPointOnCircle(x1, y1, center.x, center.y)
		var angle_seg = angle / count;
		var geometry = new THREE.Geometry();
		geometry.dynamic = true;
		for (var i = 0; i <= count; i++){
			var p = this.findPointOnCircleRadians(center.x, center.y, r, start_angle + (i * angle_seg));
			geometry.vertices.push(
				new THREE.Vector3(p.x, p.y, 0)
			)
		}
		return geometry;
	},

	arcGeometry3(x1, y1, x2, y2, r, count, reverse, zcurve){
		if (typeof reverse == 'undefined'){
			reverse = false;
		}
		if (typeof count == 'undefined'){
			count = 12;
		}
		var center = this.findCircleCenter(x1, y1, x2, y2, r, reverse);
		var angle = this.find_angle(
			{x:x1, y:y1},
			center,
			{x:x2, y:y2},
		)
		var start_angle = -this.findAngleOfPointOnCircle(center.x, center.y, x1, y1) + Math.PI		
		var angle_seg = angle / count;
		var geometry = new THREE.Geometry();
		geometry.dynamic = true;
		if (typeof zcurve == 'undefined'){
			zcurve = {x1:.5, y1:.5};
		}
		var control_points = this.getRampPoints(zcurve.x1, zcurve.y1, null, null, true);
      	var zcurve_pts = this.createEasePoints(0, 0, 1, 1, control_points, count)

		for (var i = 0; i <= count; i++){
			if(!reverse){
				var p = this.findPointOnCircleRadians(center.x, center.y, r, start_angle - (i * angle_seg));
			}else{
				p = this.findPointOnCircleRadians(center.x, center.y, r, start_angle + (i * angle_seg));
			}
			var z = e.easeOutCubic(i/count) * p.x
			z = zcurve_pts[i].y * .5;
			
			geometry.vertices.push(
				new THREE.Vector3(p.x, p.y, z)
			)
		}
		return geometry;
	},


	lineGeometry3(x1, y1, x2, y2, r, count, reverse, zcurve){
		if (typeof reverse == 'undefined'){
			reverse = false;
		}
		if (typeof count == 'undefined'){
			count = 12;
		}
		var center = this.findCircleCenter(x1, y1, x2, y2, r, reverse);
		var angle = this.find_angle(
			{x:x1, y:y1},
			center,
			{x:x2, y:y2},
		)
		var start_angle = -this.findAngleOfPointOnCircle(center.x, center.y, x1, y1) + Math.PI		
		var angle_seg = angle / count;
		var geometry = new THREE.Geometry();
		geometry.dynamic = true;
		if (typeof zcurve == 'undefined'){
			zcurve = {x1:.5, y1:.5};
		}
		var control_points = this.getRampPoints(zcurve.x1, zcurve.y1, zcurve.x2, zcurve.y2, false, 0, zcurve.max);
      	var zcurve_pts = this.createEasePoints(0, 0, 1, 1, control_points, count)
		for (var i = 0; i <= count; i++){
			if(!reverse){
				var p = this.findPointOnCircleRadians(center.x, center.y, r, start_angle - (zcurve_pts[i].x * angle));
			}else{
				p = this.findPointOnCircleRadians(center.x, center.y, r, start_angle + (zcurve_pts[i].x * angle));
			}
			var z = zcurve_pts[i].y * .25;
			
			geometry.vertices.push(
				new THREE.Vector3(p.x, p.y, z)
			)
		}
		return geometry;
	},


	circleGeometry(x, y, radius, c){
		var curve = new THREE.EllipseCurve(
			x,  y,            // ax, aY
			radius, radius,           // xRadius, yRadius
			0,  2 * Math.PI,  // aStartAngle, aEndAngle
			false,            // aClockwise
			0                 // aRotation
		);
		var points = curve.getPoints( c );
		var geometry = new THREE.BufferGeometry().setFromPoints( points );
		geometry.dynamic = true;
		return geometry;
	},

	createEasePoints(x, y, width, height, pts, segments, z){
	  if (typeof z == 'undefined'){
	  	z = 0;
	  }
      var points = [];
      var curve = new THREE.SplineCurve( pts );
      var curve_points = curve.getSpacedPoints ( segments );
      //var curve_points = this.scaleEasingPoints(x, y, height, width, pts);
      /*
      for (var i=0; i < curve_points.length; i++){
        points.push(new THREE.Vector3( (curve_points[i].x * width) + x, (curve_points[i].y * height) + y, z ) );
      }
      */
     for (var i = 0; i <= segments; i++){
     	var t = i / segments;
     	var pt = curve.getPointAt ( t );
     	points.push(new THREE.Vector3( (pt.x * width) + x, (pt.y * height) + y, z ) );
     }
      return points;
    },

	scaleEasingPoints(x, y, width, height, pts){
		var r = [];
		for(var i = 0; i < pts.length; i++){
			r.push( THREE.Vector2((pts[i].x * width) + x, (pts[i].y * width) + y) )
		}
		return r;
	},

	getRampPoints : function(x1, y1, x2, y2, zero, min, max, rep){
	  if (typeof rep == 'undefined' || isNaN(rep)){ rep = 1}
	  if (typeof min == 'undefined'){ min = 0}
	  if (typeof max == 'undefined'){ max = 1}
	  var seg_length = 1 / rep;
      if (typeof x2 != 'undefined' && x2 != null){
        var control_points = [
          new THREE.Vector2( 0, min ),
          new THREE.Vector2( x1 * seg_length, y1 ),
          new THREE.Vector2( x2 * seg_length, y2 ),
        ]
      }else{
        var control_points = [
          new THREE.Vector2( 0, min ),
          new THREE.Vector2( x1 * seg_length, y1 ),
        ]
      }
      var end_x = seg_length;
      if (rep > 1){
        for (var i = 2; i <= rep; i++){
          control_points.push(new THREE.Vector2( (x1 * seg_length) + end_x, y1 ))
          control_points.push(new THREE.Vector2( (x2 * seg_length) + end_x, y2 ))
          end_x = end_x + seg_length
        }
      }
      if (zero){
        control_points.push(new THREE.Vector2( 1, 0 ))
      }else{
        control_points.push(new THREE.Vector2( 1, max ))
      }
      return  control_points;
    },

    //order in counter clockwise fashion.
    //rewrite so that we set up a index of all vertices and then set the faces to reference the index of the verices within the array
    //so we are duplicating the vertices... might smooth out the oddness. 
	createVerticesFromPaths(path1, path2){
		var v = []
		for (var i = 0; i < path1.length - 1; i++){

			v.push(path1[i + 1].x);
			v.push(path1[i + 1].y);
			v.push(path1[i + 1].z);

			v.push(path1[i].x);
			v.push(path1[i].y);
			v.push(path1[i].z);

			v.push(path2[i].x);
			v.push(path2[i].y);
			v.push(path2[i].z);

			v.push(path1[i + 1].x);
			v.push(path1[i + 1].y);
			v.push(path1[i + 1].z);

			v.push(path2[i].x);
			v.push(path2[i].y);
			v.push(path2[i].z);

			v.push(path2[i + 1].x);
			v.push(path2[i + 1].y);
			v.push(path2[i + 1].z);

			
		}
		return v;
	},

	createVerticesFromPathArray(paths){
		console.log('recreating_vertices')
		var vertices = [];
		var v_hash = [];
		var faces = [];

		//create bottom connection to bottom of stem
		var path1 = paths[0];
		for (var i = 0; i < path1.length - 1; i++){
			var p1 = new THREE.Vector3(path1[i].x, path1[i].y, path1[i].z);
			var p2 = new THREE.Vector3(0, 0, 0);
			var p3 = new THREE.Vector3(path1[i+1].x, path1[i+1].y, path1[i+1].z);
			var p1_r = new THREE.Vector3(-path1[i].x, path1[i].y, path1[i].z);
			var p2_r = new THREE.Vector3(0, 0, 0);
			var p3_r = new THREE.Vector3(-path1[i+1].x, path1[i+1].y, path1[i+1].z);
			p1_hash = this.hashCode(p1);
			if (typeof v_hash[p1_hash] == 'undefined'){
				vertices.push(p1);
				v_hash[p1_hash] = vertices.length - 1;
				p1_index = vertices.length - 1
			}else{
				p1_index = v_hash[p1_hash];
			}

			p2_hash = this.hashCode(p2);
			if (typeof v_hash[p2_hash] == 'undefined'){
				vertices.push(p2);
				v_hash[p2_hash] = vertices.length - 1;
				p2_index = vertices.length - 1
			}else{
				p2_index = v_hash[p2_hash];
			}

			p3_hash = this.hashCode(p3);
			if (typeof v_hash[p3_hash] == 'undefined'){
				vertices.push(p3);
				v_hash[p3_hash] = vertices.length - 1;
				p3_index = vertices.length - 1
			}else{
				p3_index = v_hash[p3_hash];
			}

			p1_r_hash = this.hashCode(p1_r);
			if (typeof v_hash[p1_r_hash] == 'undefined'){
				vertices.push(p1_r);
				v_hash[p1_r_hash] = vertices.length - 1;
				p1_r_index = vertices.length - 1
			}else{
				p1_r_index = v_hash[p1_r_hash];
			}

			p2_r_hash = this.hashCode(p2_r);
			if (typeof v_hash[p2_r_hash] == 'undefined'){
				vertices.push(p2_r);
				v_hash[p2_r_hash] = vertices.length - 1;
				p2_r_index = vertices.length - 1
			}else{
				p2_r_index = v_hash[p2_r_hash];
			}

			p3_r_hash = this.hashCode(p3_r);
			if (typeof v_hash[p3_r_hash] == 'undefined'){
				vertices.push(p3_r);
				v_hash[p3_r_hash] = vertices.length - 1;
				p3_r_index = vertices.length - 1
			}else{
				p3_r_index = v_hash[p3_r_hash];
			}
			faces.push(new THREE.Face3( p2_index, p1_index, p3_index ));
			faces.push(new THREE.Face3( p2_r_index, p1_r_index, p3_r_index ));
		}

		for (var pi = 0; pi < paths.length - 1; pi++){
			var path1 = paths[pi];
			var path2 = paths[pi + 1];
			for (var i = 0; i < path1.length - 1; i++){
				var p1 = new THREE.Vector3(path1[i].x, path1[i].y, path1[i].z );
				var p2 = new THREE.Vector3(path2[i].x, path2[i].y, path2[i].z);
				var p3 = new THREE.Vector3(path2[i + 1].x, path2[i + 1].y, path2[i + 1].z );
				var p4 = new THREE.Vector3(path1[i + 1].x, path1[i + 1].y, path1[i + 1].z );
				var p1_r = new THREE.Vector3(-path1[i].x, path1[i].y, path1[i].z );
				var p2_r = new THREE.Vector3(-path2[i].x, path2[i].y, path2[i].z);
				var p3_r = new THREE.Vector3(-path2[i + 1].x, path2[i + 1].y, path2[i + 1].z );
				var p4_r = new THREE.Vector3(-path1[i + 1].x, path1[i + 1].y, path1[i + 1].z );
				var p1_index, p2_index, p3_index, p4_index;
				var p1_hash, p2_hash, p3_hash, p4_hash;
				var p1_r_index, p2_r_index, p3_r_index, p4_r_index;
				var p1_r_hash, p2_r_hash, p3_r_hash, p4_r_hash;
				p1_hash = this.hashCode(p1);
				if (typeof v_hash[p1_hash] == 'undefined'){
					vertices.push(p1);
					v_hash[p1_hash] = vertices.length - 1;
					p1_index = vertices.length - 1
				}else{
					p1_index = v_hash[p1_hash];
				}

				p2_hash = this.hashCode(p2);
				if (typeof v_hash[p2_hash] == 'undefined'){
					vertices.push(p2);
					v_hash[p2_hash] = vertices.length - 1;
					p2_index = vertices.length - 1
				}else{
					p2_index = v_hash[p2_hash];
				}

				p3_hash = this.hashCode(p3);
				if (typeof v_hash[p3_hash] == 'undefined'){
					vertices.push(p3);
					v_hash[p3_hash] = vertices.length - 1;
					p3_index = vertices.length - 1
				}else{
					p3_index = v_hash[p3_hash];
				}

				p4_hash = this.hashCode(p4);
				if (typeof v_hash[p4_hash] == 'undefined'){
					vertices.push(p4);
					v_hash[p4_hash] = vertices.length - 1;
					p4_index = vertices.length - 1
				}else{
					p4_index = v_hash[p4_hash];
				}

				p1_r_hash = this.hashCode(p1_r);
				if (typeof v_hash[p1_r_hash] == 'undefined'){
					vertices.push(p1_r);
					v_hash[p1_r_hash] = vertices.length - 1;
					p1_r_index = vertices.length - 1
				}else{
					p1_r_index = v_hash[p1_r_hash];
				}

				p2_r_hash = this.hashCode(p2_r);
				if (typeof v_hash[p2_r_hash] == 'undefined'){
					vertices.push(p2_r);
					v_hash[p2_r_hash] = vertices.length - 1;
					p2_r_index = vertices.length - 1
				}else{
					p2_r_index = v_hash[p2_r_hash];
				}

				p3_r_hash = this.hashCode(p3_r);
				if (typeof v_hash[p3_r_hash] == 'undefined'){
					vertices.push(p3_r);
					v_hash[p3_r_hash] = vertices.length - 1;
					p3_r_index = vertices.length - 1
				}else{
					p3_r_index = v_hash[p3_r_hash];
				}

				p4_r_hash = this.hashCode(p4_r);
				if (typeof v_hash[p4_r_hash] == 'undefined'){
					vertices.push(p4_r);
					v_hash[p4_r_hash] = vertices.length - 1;
					p4_r_index = vertices.length - 1
				}else{
					p4_r_index = v_hash[p4_r_hash];
				}
				
				faces.push(new THREE.Face3( p1_index, p2_index, p4_index ));
				faces.push(new THREE.Face3( p4_index, p2_index, p3_index ));
				faces.push(new THREE.Face3( p1_r_index, p2_r_index, p4_r_index ));
				faces.push(new THREE.Face3( p4_r_index, p2_r_index, p3_r_index ));
			}
		}
		
		return {vertices : vertices, faces : faces};
	},

	createVerticesFromPathArray_XXX(paths){
		var vertices = [];
		var v_hash = [];
		var faces = [];
		var normals = [];
		for (var pi = 0; pi < paths.length - 1; pi++){
			var path1 = paths[pi];
			var path2 = paths[pi + 1];
			for (var i = 0; i < path1.length - 1; i++){
				var p1 = new THREE.Vector3(path1[i].x, path1[i].y, path1[i].z );
				var p2 = new THREE.Vector3(path2[i].x, path2[i].y, path2[i].z);
				var p3 = new THREE.Vector3(path2[i + 1].x, path2[i + 1].y, path2[i + 1].z );
				var p4 = new THREE.Vector3(path1[i + 1].x, path1[i + 1].y, path1[i + 1].z );
				var p1_index, p2_index, p3_index, p4_index;
				var p1_hash, p2_hash, p3_hash, p4_hash;

				p1_hash = this.hashCode(p1);
				if (typeof v_hash[p1_hash] == 'undefined'){
					vertices.push(p1.x, p1.y, p1.z);
					v_hash[p1_hash] = vertices.length - 1;
					p1_index = (vertices.length/3) - 1
				}else{
					p1_index = v_hash[p1_hash];
				}

				p2_hash = this.hashCode(p2);
				if (typeof v_hash[p2_hash] == 'undefined'){
					vertices.push(p2.x, p2.y, p2.z);
					v_hash[p2_hash] = vertices.length - 1;
					p2_index = (vertices.length/3) - 1
				}else{
					p2_index = v_hash[p2_hash];
				}

				p3_hash = this.hashCode(p3);
				if (typeof v_hash[p3_hash] == 'undefined'){
					vertices.push(p3.x, p3.y, p3.z);
					v_hash[p3_hash] = vertices.length - 1;
					p3_index = (vertices.length/3) - 1
				}else{
					p3_index = v_hash[p3_hash];
				}

				p4_hash = this.hashCode(p4);
				if (typeof v_hash[p4_hash] == 'undefined'){
					vertices.push(p4.x, p4.y, p4.z);
					v_hash[p4_hash] = vertices.length - 1;
					p4_index = (vertices.length/3) - 1
				}else{
					p4_index = v_hash[p4_hash];
				}
				
				//faces.push(new THREE.Face3( p1_index, p2_index, p4_index ));
				faces.push( p1_index, p4_index, p2_index );
				normals.push( 0, 0, 1 );
				//faces.push(new THREE.Face3( p4_index, p2_index, p3_index ));
				faces.push(p1_index, p3_index, p4_index );
				normals.push( 0, 0, 1 );
				
			}
		}
		
		return {vertices : vertices, faces : faces, normals : normals};
	},

	hashCode(vector) {
	  var str = "x" + vector.x + "y" + vector.y + "z" + vector.z;
	  var hash = 0, i, chr;
	  if (str.length === 0) return hash;
	  for (i = 0; i < str.length; i++) {
	    chr   = str.charCodeAt(i);
	    hash  = ((hash << 5) - hash) + chr;
	    hash |= 0; // Convert to 32bit integer
	  }
	  return hash;
	}

};

export default geometryFunctions;