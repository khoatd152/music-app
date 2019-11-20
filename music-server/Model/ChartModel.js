const ObjectId = require('mongodb').ObjectID;
const moment = require('moment');

const FORMAT_DATE_TIME = "DD/MM/YYYY";

module.exports = {
    getAllChart: (db) => {
        return db.collection("Song").find({ delete: { $ne: true } }).toArray();
    },
    getChartByType: (db, obj) => {
        obj.limit = parseInt(obj.limit);
        let results;
        switch (parseInt(obj.type)) {
            case 1:
                results = db.collection("Song").find({ delete: { $ne: true } }).sort({ weekviews: -1 }).limit(obj.limit).toArray();
                break;
            case 2:
                results = db.collection("Song").find({ delete: { $ne: true } }).sort({ monthviews: -1 }).limit(obj.limit).toArray();
                break;
            default:
                results = db.collection("Song").find({ delete: { $ne: true } }).sort({ views: -1 }).limit(obj.limit).toArray();
                break;
        }
        return results;
    },
    insertChart: (db, charts, callback) => {
        var now = moment();
        var monday = now.clone().weekday(1);
        var sunday = now.clone().weekday(7);
        charts.forEach(element => {
            element["from"] = monday.format(FORMAT_DATE_TIME);
            element["to"] = monday.format(FORMAT_DATE_TIME);
        });
        return db.collection("Song").insertMany(charts, callback);
    },
    
}



