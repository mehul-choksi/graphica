var express = require('express');
var router = express.Router()

var knex = require("knex")({
    client: "mysql",
    connection: {
      host : "127.0.0.1",
      user : "root",
      password : "root",
      database : "comp_te_2018_sem1"
    },
});


router.get('/:subject', (request, response, next) => {
    var subjectName = request.params.subject;
    var gradeCount;
    knex.raw(`select * from subject_student_grade_count where subject = '${subjectName}'`).then((data) =>{
        gradeCount = data[0][0];

        knex.raw(`select * from subjects where subject_name = '${subjectName}'`).then((subjectData) =>{
            subject = subjectData[0][0];
            console.log(`Query: select * from ${subjectName}_scores`);
            knex.raw(`select * from ${subjectName}_histogram`).then((scoreData) => {
                subjectScores = scoreData[0];
                var output = JSON.parse("[" + JSON.stringify(gradeCount) + "," + JSON.stringify(subject) +","
                +JSON.stringify(subjectScores) + "]");
                response.json(output);
            })
        });
        
    });
});

module.exports = router;