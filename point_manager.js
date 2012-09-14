var PointManager;

PointManager = (function() {

  function PointManager(points) {
    this.points = points;

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

    PointManager.prototype.closest = function(point, points_range, skip) {
      console.time('closest');
      if(skip == null)
        skip = 0;

      var temp_points_range = points_range;
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

    /*PointManager.prototype.order = function() {
      console.time('order');
      this.ordered = [];
      for(var i=0; i < this.points.length; i++) {
        this.ordered.push(this.closest(this.points[i], this.points));
      }

      console.timeEnd('order');

      return this.ordered;
    };*/
  }

  return PointManager;

})();