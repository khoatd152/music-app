const Chart = require('../Model/ChartModel');

module.exports = {
    get: (req, res) => {
        Chart.getAllChart(req.app.locals.db).then((Charts) => {
            res.json(Charts);
        });
    },
    getChartByType: (req, res) => {
        Chart.getChartByType(req.app.locals.db, req.params).then(Charts => {
            res.json(Charts);
        });
    },
    insert: (req, res) => {
        Chart.insertChart(req.app.locals.db, req.body, (err, result) => {
            if (err)
                console.log(err);
            res.json(result);
        });
    },
    
}