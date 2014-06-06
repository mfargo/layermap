var MapService = function() {
}

MapService.prototype.loadMaps = function(callback) {
	$.ajax({
	  url: 'service/maps.php',
	  dataType: 'jsonp',
	  success: function(obj) {
	  	var d = jQuery.parseJSON(obj);
		callback.call(null, d.maps);
	  }
	});
}

MapService.prototype.loadAnnotations = function(callback) {
	$.ajax({
	  url: 'service/checkins.php',
	  dataType: 'jsonp',
	  success: function(obj) {
	  	var d = jQuery.parseJSON(obj);
		callback.call(null, d.response.checkins.items);
	  }
	});

}