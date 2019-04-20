var express = require('express');
var router = express.Router();

var knex = require("knex")({
    client: "mysql",
    connection: {
      host : "127.0.0.1",
      user : "root",
      password : "root",
      database : "comp_te_2018_sem1"
    },
});

router.get('/api/:rollNo', (req,res,next) => {
    var rollNo = req.params.rollNo;
    var array = [];
    knex.raw(`select * from student_scores where roll_no = '${rollNo}'`).then((data) => {
        array.push(data[0][0]);
        knex.raw(`select * from student_theory_percentile where roll_no = '${rollNo}'`).then((percentileData) => {
            array.push(percentileData[0][0]);

            knex.raw(`select * from student_sgpa where roll_no = '${rollNo}'`).then((gradePoint) => {
                array.push(gradePoint[0][0]);
                knex.raw(`select * from student_total_rank where roll_no = '${rollNo}'`).then((rank) => {
                    array.push(rank[0][0]);
                    res.send(array);
                });
                
            })

        })
        
    });

})


module.exports = router;
