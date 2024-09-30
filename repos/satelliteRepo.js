let fs = require("fs");
const FILE_NAME = "./assets/satellites2.json";

let satelliteRepo = {
  get: function (resolve, reject) {
    fs.readFile(FILE_NAME, function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(data));
      }
    });
  },
  getById: function (id, resolve, reject) {
    fs.readFile(FILE_NAME, function (err, data) {
      if (err) {
        reject(err);
      } else {
        let satellite = JSON.parse(data).find((s) => s.id == id);
        resolve(satellite);
      }
    });
  },
  search: function (searchObject, resolve, reject) {
    fs.readFile(FILE_NAME, function (err, data) {
      if (err) {
        reject(err);
      } else {
        let satellites = JSON.parse(data);
        //Perform search
        if (searchObject) {
          //Example search object
          //let search object = {
          //"id": 1,
          //"type": 'A'}
          satellites = satellites.filter(
            (s) =>
              (searchObject.id ? s.id == searchObject.id : true) &&
              (searchObject.type
                ? s.type
                    .toLowerCase()
                    .indexOf(searchObject.type.toLowerCase()) >= 0
                : true)
          );
        }
        resolve(satellites);
      }
    });
  },
  insert: function (newData, resolve, reject) {
    fs.readFile(FILE_NAME, function (err, data) {
      if (err) {
        reject(err);
      } else {
        let satellites = JSON.parse(data);
        satellites.push(newData);
        fs.writeFile(FILE_NAME, JSON.stringify(satellites), function (err) {
          if (err) {
            reject(err);
          } else {
            resolve(newData);
          }
        });
      }
    });
  },
  update: function (newData, id, resolve, reject) {
    fs.readFile(FILE_NAME, function (err, data) {
      if (err) {
        reject(err);
      } else {
        let satellites = JSON.parse(data);
        let satellite = satellites.find((s) => s.id == id);

        if (satellite) {
          Object.assign(satellite, newData);
          fs.writeFile(FILE_NAME, JSON.stringify(satellites), function (err) {
            if (err) {
              reject(err);
            } else {
              resolve(newData);
            }
          });
        }
      }
    });
  },
  delete: function (id, resolve, reject) {
    fs.readFile(FILE_NAME, function (err, data) {
      if (err) {
        reject(err);
      } else {
        let satellites = JSON.parse(data);
        let index = satellites.findIndex((s) => s.id == id);
        
        if (index != -1) {
          satellites.splice(index, 1);
          fs.writeFile(FILE_NAME, JSON.stringify(satellites), function (err) {
            if (err) {
              reject(err);
            } else {
              resolve(index);
            }
          });
        }
      }
    });
  },
};

module.exports = satelliteRepo;
