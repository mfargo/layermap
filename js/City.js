var City = function(data) {
	this.group = new THREE.Object3D();
	this.data = data;
	this.bounds = {
		x: data.bounds[1],
		y: data.bounds[0],
		width: data.bounds[3] - data.bounds[1],
		height: data.bounds[2] - data.bounds[0]
	}
	this.size = {width:0, height:0};
}

City.prototype.init = function(annotations, callback) {
	this.annotations = annotations;
    this.loader = new THREE.TextureLoader();
    this.loadTexture(callback);
 }

City.prototype.loadTexture = function(callback) {
	var self = this;
	var i = self.group.children.length;
	var url = 'img/layers/' + this.data.name + '/' + this.data.name + '_' + this.data.layers[i].name + '.png';
	this.loader.load(url, function(e) {
		$('#loading').text("Loading " + self.data.name + "'s "+self.data.layers[i].name)
		if (self.size.width==0) self.size.width = e.image.width;
		if (self.size.height==0) self.size.height = e.image.height;
	    var layer = new CityLayer(self.data.layers[i], e);
	    layer.mesh.position.z = (self.data.layers.length - i) * -20;
    	self.group.add( layer.mesh );

		if (self.group.children.length==self.data.layers.length) {
			self.loadCheckins(callback);
		}
		else self.loadTexture(callback);
	});
}

City.prototype.loadCheckins = function(callback) {
	$('#loading').text("Loading checkins");
	var total = 0;
	var geometry = new THREE.Geometry();
	for (var i=0; i<this.annotations.length; i++) {
		var a = this.annotations[i];
		var v = this.getVertex(a.venue.location.lat, a.venue.location.lng );
		if (v.x>-this.size.width && v.x<this.size.width && v.y>-this.size.width && v.y<this.size.height) {
			geometry.vertices.push(v);
			total++;
		}
	}
	$('#loading').text("Showing " + total + " checkins");

	var sprite = THREE.ImageUtils.loadTexture( "img/textures/dot.png" );
	var material = new THREE.ParticleBasicMaterial( { size: 32, map: sprite, transparent : true } );
	this.particles = new THREE.ParticleSystem( geometry, material );
	this.particles.sortParticles = true;
	this.group.add(this.particles);
	this.loadOverlays(callback);
}

City.prototype.loadOverlays = function(callback) {
	var self = this;
	for (var i=0; i<this.data.annotations.length; i++) {
		var a = this.data.annotations[i];
		var overlay = new CityAnnotation(a, function(o) {
			self.group.add(o.group);
		});
		var v = this.getVertex(a.lat, a.lng );
		overlay.group.position.x = v.x;
		overlay.group.position.y = v.y;
	}
	callback.call(null);
}


City.prototype.getVertex = function(lat, lng) {
	var xp = (lng - this.bounds.x)/this.bounds.width;
	var yp = (lat - this.bounds.y)/this.bounds.height;
	return new THREE.Vector3(-this.size.width/2.0 + this.size.width*xp, -this.size.height/2.0+this.size.height*yp, 20);
}
