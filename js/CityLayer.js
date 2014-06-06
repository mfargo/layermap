var CityLayer = function(data, texture) {
	this.data = data;

    var geometry = new THREE.PlaneGeometry( 4096, 4096 );

    //texture.anisotropy = 16; //renderer.getMaxAnisotropy();

    this.material = new THREE.MeshBasicMaterial( { color:'#'+data.color, map: texture, /*side:THREE.DoubleSide,*/ transparent:true } );
    this.mesh = new THREE.Mesh( geometry, this.material );
}
