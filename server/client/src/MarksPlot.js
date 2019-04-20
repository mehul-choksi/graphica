export default class MarksPlot {
    getPlotData = (subjects, gradePlot) => {
        
        var gradeKeys = [];
        var gradeValues = [];

        for(var key in gradePlot){
            gradeKeys.push(key);
            gradeValues.push(gradePlot[key]);
        }
        return {
            gradeKeyArray : gradeKeys,
            gradeValueArray : gradeValues
        }
    }
}