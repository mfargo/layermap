var CityAnnotation = function(data, callback) {
	this.data = data;
	this.group = new THREE.Object3D();
	var self = this;

	var lineMaterial = new THREE.LineBasicMaterial({color: 0xFFFFFF, linewidth:2});
	var lineGeometry = new THREE.Geometry();
    lineGeometry.vertices.push(new THREE.Vector3(0, 0, 0));
    lineGeometry.vertices.push(new THREE.Vector3(0, 0, 100));
	var line = new THREE.Line(lineGeometry, lineMaterial);
	this.group.add(line);


	var self = this;
	/*
	this.textMesh = this.makeMesh(data.name);

    this.textMesh.position.z = 100;
    this.textMesh.rotation.x = 90;
	this.group.add(this.textMesh);
	callback.call(null, this);
	*/

	var sprite = THREE.ImageUtils.loadTexture( "img/textures/"+data.name+".png", new THREE.UVMapping(), function() {
		
		/*
		var material = new THREE.MeshBasicMaterial( { map: sprite, side:THREE.DoubleSide, transparent:true, blending: THREE.AdditiveBlending } );
	    var geometry = new THREE.PlaneGeometry( sprite.image.width, sprite.image.height );
	    self.textMesh = new THREE.Mesh( geometry, material );
	    self.textMesh.position.z = 100;
	    self.textMesh.rotation.x = 90;
    	self.group.add(self.textMesh);
    	*/

    	
    	var material = new THREE.ParticleBasicMaterial( { size: sprite.image.width, map: sprite, blending: THREE.NormalBlending, transparent : true } );
    	//material.depthTest = false;
    	material.depthWrite = false;
    	var geometry = new THREE.Geometry();
    	geometry.vertices.push(new THREE.Vector3(0, 0, 120));
		self.particles = new THREE.ParticleSystem( geometry, material );
		self.particles.sortParticles = false;
		self.group.add(self.particles);
		callback.call(null, self);
		material.needsUpdate = true;
		
	} );


}

CityAnnotation.prototype.makeMesh = function(text) {

	var size = 64;
	var canvas = document.createElement("canvas");
	var context = canvas.getContext("2d");
	context.font = size+"pt Arial";

	var textWidth = context.measureText(text).width;
 
	canvas.width = textWidth;
	canvas.height = size;

	context.textAlign = "center";
	context.textBaseline = "middle";
	context.fillStyle = '#FFFFFF';
	context.fillText(text, canvas.width / 2, canvas.height / 2);


	var texture = new THREE.Texture(canvas);
	texture.needsUpdate = true;

	var material = new THREE.MeshBasicMaterial({
		map : texture,
		transparent: true
	});

	var mesh = new THREE.Mesh(new THREE.PlaneGeometry(canvas.width, canvas.height), material);
	// mesh.overdraw = true;
	mesh.doubleSided = true;

	return mesh;

}