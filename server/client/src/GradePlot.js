export default class GradePlot {
    printSubjects = (subjects) => {
        var subjectStr = "";
        for (var key in subjects) { 
    
          if(key === "subject"){
            subjectStr += "<h2>" +  key + " : " +subjects[key] + "</h2><br>";
          }
          
          else{
            subjectStr += "<h2>" +  key + " : </h2><div class = 'text'>" +subjects[key] + "</div><br>";
          }
          return subjectStr;
        }
    }
        
        getPlotData = (marksPlotArr) => {
            var marksLength = marksPlotArr.length;
            var lo = 0, hi = 0;
            var count = [];
            var range = [];
            var firstClassCount = 0;
            var distinctionCount = 0;
            for(var i = 0; i < marksLength; i++){
                var obj = marksPlotArr[i];
                hi = lo + 3;
                range.push(lo + "-" + hi);
                if(lo >= 60 && lo < 66){
                  firstClassCount += obj["student_count"];
                }
                else if(lo >= 66){
                  distinctionCount += obj["student_count"];
                }
                count.push(obj["student_count"]);
                lo = hi;
              }

            var distColors = [];
            for(let i = 0; i < 20; i++){
            distColors.push("#0000ff");
            }
            for(let i = 0; i < 2; i++){
            distColors.push("#ffff00");
            }
            for(let i = 22; i <= 33; i++){
            distColors.push("#00ff00");
            }
            return {
                distinction : distinctionCount,
                firstClass : firstClassCount ,
                rangeArr : range,
                countArr : count,
                distColorsArr : distColors
            }

        }
    
}

