var Map = function() {

  
  var renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );

  var camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 10000 );
  camera.position.z = 200;
  camera.position.y = -1000;
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  var scene = new THREE.Scene();
  renderer.render( scene, camera );

/*
        var ambient = new THREE.AmbientLight( 0xffffff );
        ambient.color.setHSL( 0.1, 0.3, 0.2 );
        scene.add( ambient );

    var dirLight = new THREE.DirectionalLight( 0xffffff, 0.125 );
    dirLight.position.set( 0, -1, 0 ).normalize();
    scene.add( dirLight );

    dirLight.color.setHSL( 0.1, 0.7, 0.5 );
*/

  window.addEventListener( 'resize', onWindowResize, false );

  var city = null;
  var service = new MapService();
  service.loadMaps(function(cities) {
    var $s = $("#cityselect");
    for (var i=0; i<cities.length; i++)
      $s.append($("<option />").val(i).text(cities[i].name));

    $('#cityselect').change(function(e) {
      var v = $('#cityselect').val();
      if (v>-1 && v < cities.length) {
        city = new City(cities[v]);
        scene.add(city.group);

        $('#loading').text("Loading checkins for " + cities[v].name);
        $('#cityselect').remove();

        service.loadAnnotations(function(checkins) {
          city.init(checkins, function() {          
            var controls = new THREE.OrbitControls( camera );
            controls.target.set( 0, 1000, -200 )
          });
        });
      }

    });



  });





  animate();

  function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

  }

  function animate() {

    requestAnimationFrame( animate );

    renderer.render( scene, camera );

  }
}



$( document ).ready(function() {
	var map = new Map();
});



