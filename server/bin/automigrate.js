var app = require('../server');
 
var activities_array = [
  {
    name: 'Swimming',
    image: 'https://upload.wikimedia.org/wikipedia/commons/1/1b/Natacio.jpg',
    time: 'summer'
  },
  {
    name: 'Bowling',
    image: 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Bowlerbowling.JPG',
    time: 'both'
  }
];
 
// this loads the ActivitytDB configuration in ~/server/datasources.json
var dataSource = app.dataSources.ActivityDB;
 
// this automigrates the Activity model 
dataSource.automigrate('activity', function(err) {
  if (err) throw err;
 
  // this loads the Activity model from ~/common/models/Activity.json
  var activity_var = app.models.activity;
  var count = activities_array.length;
  activities_array.forEach(function(activity) {
     // insert new records into the Activity table
     activity_var.create(activity, function(err, record) {
      if (err) return console.log(err);
 
      console.log('Record created:', record);
 
      count--;
 
      if (count === 0) {
        console.log('done');
        dataSource.disconnect();
      }
    });
  });
});