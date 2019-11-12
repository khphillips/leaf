export default{
	items : [
		{
			id : 'camera',
			name : 'Camera',
			children : [
				{
					'id' : 'fov',
					name : 'Field Of View',
					value : 21,
					type : 'slider',
					max : 180,
					min : 1,
				},
				{
					'id' : 'x',
					name : 'X',
					value : 1.29,
					type : 'slider',
					max : 10,
					min : -10,
				},
				{
					'id' : 'y',
					name : 'Y',
					value : .07,
					type : 'slider',
					max : 10,
					min : -10,
				},
				{
					'id' : 'z',
					name : 'Z',
					value : 9,
					type : 'slider',
					max : 10,
					min : -10,
				},
				{
					'id' : 'lookAtX',
					name : 'Look X',
					value : 0,
					type : 'slider',
					max : 10,
					min : -10,
				},
				{
					'id' : 'lookAtY',
					name : 'Look Y',
					value : 0,
					type : 'slider',
					max : 10,
					min :  -10,
				},
				{
					'id' : 'lookAtZ',
					name : 'Look Z',
					value : 0,
					type : 'slider',
					max : 10,
					min :  -10,
				}
			]
		},
		{
			id : 'plane',
			name : 'Plane',
			children : [
				{
					'id' : 'width',
					name : 'Width',
					value : 30,
					type : 'slider',
					max : 100,
					min : 1,
				},
				{
					'id' : 'height',
					name : 'Height',
					value : 12,
					type : 'slider',
					max : 100,
					min : 1,
				},
				{
					'id' : 'material',
					name : 'material',
					children : [
						{
							id : 'color',
							name : "Color",
							type : 'text',
							value : "#ffffff"
						}
					]
				}
			]
		},
		{
			id : 'leaf',
			name : 'Leaf',
			children : [
				{
					'id' : 'rotate',
					name : 'Rotate',
					value : 0,
					type : 'slider',
					max : 360,
					min : -360,
				},
				{
					'id' : 'length',
					name : 'Length',
					value : 3,
					type : 'slider',
					max : 20,
					min : .01,
				},
				{
					'id' : 'num_veins',
					name : 'Number of Veins',
					value : 2,
					type : 'slider',
					max : 20,
					min : 1,
					step: 1
				},
				{
					'id' : 'vein_reverse_arc',
					name : 'Vein Reverse Arc',
					value : false,
					type : 'checkbox',
				},
				{
					'id' : 'vein_length',
					name : 'Vein Length',
					value : 4,
					type : 'slider',
					max : 25,
					min : 0.01,
				},
				{
					'id' : 'rotation_z',
					name : 'Rotation Z',
					value : 0,
					type : 'slider',
					max : 3,
					min : -3,
				},
				{
					'id' : 'rotation_x',
					name : 'Rotation X',
					value : 0,
					type : 'slider',
					max : 3,
					min : -3,
				},
				{
					'id' : 'rotation_y',
					name : 'Rotation Y',
					value : 0,
					type : 'slider',
					max : 3,
					min : -3,
				},
				{
					id : 'vein_distribution_curve',
					name : 'Vein Distribution Curve',
					children : [
						{
							'id' : 'x1',
							name : 'X 1 %',
							value : .46,
							type : 'slider',
							max : 1,
							min : 0,
							step: .01
						},
						{
							'id' : 'y1',
							name : 'Y 1 %',
							value : .6,
							type : 'slider',
							max : 1,
							min : 0,
							step: .01
						},
						{
							'id' : 'min',
							name : 'Min',
							value : 0,
							type : 'slider',
							max : 1,
							min : 0,
						},
						{
							'id' : 'max',
							name : 'Max',
							value : 1,
							type : 'slider',
							max : 1,
							min : 0,
						}
					]
				},
				{
					id : 'vein_angle_curve',
					name : 'Vein Angle Curve',
					children : [
						{
							'id' : 'x1',
							name : 'X 1 %',
							value : .5,
							type : 'slider',
							max : 1,
							min : 0,
							step: .01
						},
						{
							'id' : 'y1',
							name : 'Y 1 %',
							value : .35,
							type : 'slider',
							max : 1,
							min : 0,
							step: .01
						},
						{
							'id' : 'min',
							name : 'Min',
							value : .17,
							type : 'slider',
							max : 1,
							min : 0,
						},
						{
							'id' : 'max',
							name : 'Max',
							value : .6,
							type : 'slider',
							max : 1,
							min : 0,
						}
					]
				},
				{
					id : 'vein_length_curve',
					name : 'Vein Length Curve',
					children : [
						{
							'id' : 'x1',
							name : 'X 1 %',
							value : .45,
							type : 'slider',
							max : 1,
							min : 0,
							step: .01
						},
						{
							'id' : 'y1',
							name : 'Y 1 %',
							value : .32,
							type : 'slider',
							max : 1,
							min : 0,
							step: .01
						},
						{
							'id' : 'x2',
							name : 'X 2 %',
							value : .7,
							type : 'slider',
							max : 1,
							min : 0,
							step: .01
						},
						{
							'id' : 'y2',
							name : 'Y 2 %',
							value : .07,
							type : 'slider',
							max : 1,
							min : 0,
							step: .01
						},
						{
							'id' : 'repeat',
							name : 'Repeat',
							value : 1,
							type : 'slider',
							max : 10,
							min : 1,
							step: 1
						},
					]
				},
				{
					id : 'vein_z_curve',
					name : 'Vein Z Curve',
					children : [
						{
							'id' : 'x1',
							name : 'X 1 %',
							value : .4,
							type : 'slider',
							max : 1,
							min : 0,
							step: .01
						},
						{
							'id' : 'y1',
							name : 'Y 1 %',
							value : .07,
							type : 'slider',
							max : 1,
							min : 0,
							step: .01
						},
						{
							'id' : 'x2',
							name : 'X 2 %',
							value : .83,
							type : 'slider',
							max : 1,
							min : 0,
							step: .01
						},
						{
							'id' : 'y2',
							name : 'Y 2 %',
							value : .33,
							type : 'slider',
							max : 1,
							min : 0,
							step: .01
						},
						{
							'id' : 'max',
							name : 'Max',
							value : .5,
							type : 'slider',
							max : 1,
							min : -1,
						}
					]
				}
			]
		},
		{
			id : 'cube',
			name : 'Cube',
			children : [
				{
					'id' : 'width',
					name : 'Rotation Z',
					value : 1,
					type : 'slider',
					max : 3,
					min : -3,
				},
				{
					'id' : 'height',
					name : 'Rotation Z',
					value : 1,
					type : 'slider',
					max : 3,
					min : -3,
				},
				{
					'id' : 'depth',
					name : 'Rotation Z',
					value : 1,
					type : 'slider',
					max : 3,
					min : -3,
				},
				{
					'id' : 'rotate',
					name : 'Rotation Z',
					value : 1,
					type : 'slider',
					max : 3,
					min : -3,
				},
			]
		},
		{
			id : 'shape3',
			name : 'Shape 3',
			children : [
				{
					'id' : 'rotation_z',
					name : 'Rotation Z',
					value : 0,
					type : 'slider',
					max : 3,
					min : -3,
				},
				{
					'id' : 'rotation_x',
					name : 'Rotation X',
					value : 0,
					type : 'slider',
					max : 3,
					min : -3,
				},
				{
					'id' : 'rotation_y',
					name : 'Rotation Y',
					value : 0,
					type : 'slider',
					max : 3,
					min : -3,
				},
				{
					'id' : 'num_segments',
					name : 'Number of Segments',
					value : 50,
					type : 'slider',
					max : 100,
					min : 1,
					step: 1
				},
				{
					'id' : 'segment_height',
					name : 'Segment Height',
					value : .48,
					type : 'slider',
					max : 5,
					min : .01,
				},
				{
					'id' : 'bone_scale',
					name : 'Bone Scale',
					children : [
						{
							'id' : 'bone0',
							name : 'Bone 0',
							value : 1,
							type : 'slider',
							max : 10,
							min : .01,
						},
						{
							'id' : 'bone1',
							name : 'Bone 1',
							value : 1,
							type : 'slider',
							max : 10,
							min : .01,
						},
						{
							'id' : 'bone2',
							name : 'Bone 2',
							value : 1,
							type : 'slider',
							max : 10,
							min : .01,
						},
						{
							'id' : 'bone3',
							name : 'Bone 3',
							value : 1,
							type : 'slider',
							max : 10,
							min : .01,
						},
						{
							'id' : 'bone4',
							name : 'Bone 4',
							value : 1,
							type : 'slider',
							max : 10,
							min : .01,
						},
						{
							'id' : 'bone5',
							name : 'Bone 5',
							value : 1,
							type : 'slider',
							max : 10,
							min : .01,
						}
					]
				},
				{
					'id' : 'material',
					name : 'material',
					children : [
						{
							id : 'color',
							name : "Color",
							type : 'text',
							value : "#ffffff"
						}
					]
				}
			]
		},

	],
	config : function(){
		return this.simpleMap(this.items, {});
	},
	get : function(){
		return this.cfg = this.map(this.items, {});
	},
	simpleMap : function(item, parent){
		for (var i = 0; i < item.length; i++){
			if (typeof item[i].value != 'undefined'){
				parent[item[i].id] = item[i].value;
			}else{
				parent[item[i].id] = {};
			}
			if (typeof item[i].children != 'undefined' && item[i].children.length > 0){
				this.simpleMap(item[i].children, parent[item[i].id]);
			}
		}
		return parent;
	},
	map : function(item, parent){
		for (var i = 0; i < item.length; i++){
			parent[item[i].id] = item[i];
			if (typeof item[i].children != 'undefined' && item[i].children.length > 0){
				this.map(item[i].children, parent[item[i].id]);
			}
		}
		return parent;
	}
}