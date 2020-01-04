var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;

db.on('error', function () {
  console.log('mongoose connection error');
});

db.once('open', function () {
  console.log('mongoose connected successfully');
});

var userSchema = mongoose.Schema({
  username: { type: String, unique: true },
  email: String,
  password: String
});

var user = mongoose.model('user', userSchema);

var selectAll = function (callback) {
  user.find({}, function (err, users) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, users);
    }
  });
};
var create = function (data, callback) {
  user.create(data, (err, dat) => {
    if (err) {
      callback(err, null)
    } else {
      callback(null, dat)
    }

  })
}

var removeAll = function (dat, callback) {
  user.deleteMany({}, (err, dat) => {
    if (err) {
      callback(err, null)
    } else {
      callback(null, dat)
    }
  });
}

var removeOne = function (data, callback) {
  user.deleteOne(data, (err, dat) => {
    if (err) {
      callback(err, null)
    } else {
      callback(null, dat)
    }
  })
}

var updateOne = function (filter, update, callback) {
  user.findOneAndUpdate(filter, update, (err, dat) => {
    if (err) {
      callback(err, null)
    } else {
      callback(null, dat)
    }
  })
}

module.exports.selectAll = selectAll;
module.exports.create = create;
module.exports.removeAll = removeAll;
module.exports.removeOne = removeOne;
module.exports.updateOne = updateOne;