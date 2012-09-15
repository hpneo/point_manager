var PointManager;

PointManager = (function() {

  function PointManager(points) {
    this.points = points;
    this.in_path = [];

    PointManager.prototype.get_distances = function(point, points_range) {
      var distances = [];
      for(var i=0; i < points_range.length; i++ ) {
        if(point.id != points_range[i].id)
          var distance = this.get_distance(point, points_range[i]);
        else
          var distance = Infinity;

        distances.push(distance);
      }

      return distances;
    };

    PointManager.prototype.get_distance = function(origin, destination) {
      return $.fn.haversine(origin.latitude, origin.longitude, destination.latitude, destination.longitude, 'km');
    };

    PointManager.prototype.get_closest = function(point, skip) {
      console.time('closest');
      if(skip == null)
        skip = 0;

      var temp_points_range = this.points.slice(0);
      var distances = this.get_distances(point, temp_points_range);

      for(var i=0; i < skip; i++) {
        var item_to_delete = Math.min.apply(Math, distances);
        var index_to_delete = distances.indexOf(item_to_delete);

        distances.splice(index_to_delete, 1);
        temp_points_range.splice(index_to_delete, 1);
      }

      var item = Math.min.apply(Math, distances);
      var index = distances.indexOf(item);

      console.timeEnd('closest');

      return temp_points_range[index];
    };

    PointManager.prototype.closest = function(point) {
      var closest = this.get_closest(point);

      var i = 1;

      while(this.in_path.indexOf(closest.id) > -1) {
        closest = this.get_closest(point, i);

        i++;
      }

      this.in_path.push(closest.id);

      return closest;
    };
  }

  return PointManager;

})();