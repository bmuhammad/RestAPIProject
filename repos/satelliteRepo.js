let fs = require('fs');
const FILE_NAME = './assets/satellites.json'

let satelliteRepo = {
  get: function(resolve, reject){
    fs.readFile(FILE_NAME, function (err, data) {
      if(err){
        reject(err);
      }
      else {
        resolve(JSON.parse(data));
      }
    })
  },
  getById: function(id, resolve, reject){
    fs.readFile(FILE_NAME, function (err, data) {
      if(err) {
        reject(err);
      }
      else {
        let satellite = JSON.parse(data).find(s => s.id == id);
        resolve(satellite);
      }
    })
  }
};

module.exports = satelliteRepo;