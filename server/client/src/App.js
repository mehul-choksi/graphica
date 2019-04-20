import React, { Component } from 'react';
import './App.css';
import ReactHtmlParser from 'react-html-parser';
import Plot from 'react-plotly.js';
import GradePlot from './GradePlot';
import MarksPlot from './MarksPlot';
import 'jquery'
const gradePlotObj = new GradePlot();
const marksPlotObj = new MarksPlot();

class App extends Component {

  state = {
    subjects : {},
    gradePlot : {},
    marksPlot : {},
    studentData : {}
  };
  componentDidMount(){
    fetch("/subjects/toc").then((response) => response.json()).then((responseJson) =>{
      const subjects = responseJson[1];
      const gradePlot = responseJson[0];
      const marksPlot = responseJson[2];
      this.setState({subjects});
      this.setState({gradePlot});
      this.setState({marksPlot});
    });
    
  }

   printSubjects = (subjects) => {
    var subjectStr = "";
    for (var key in subjects) { 

      if(key === "subject"){
        subjectStr += "<h2>" +  key + " : " +subjects[key] + "</h2><br>";
      }
      
      else{
        subjectStr += "<h2>" +  key + " : </h2><div class = 'text'>" +subjects[key] + "</div><br>";
      }
    }
    return subjectStr;
   }

  render() {
    var plottableMarksData = marksPlotObj.getPlotData(this.state.subjects, this.state.gradePlot);
    var marksPlotArr = this.state.marksPlot;
    var plottableGradeData = gradePlotObj.getPlotData(marksPlotArr);
    
    return (     
      <div className = "App">
        
        {
          ReactHtmlParser(this.printSubjects(this.state.subjects))
        }
        
        <h2> GradePlot</h2><br/>
        
        <div className = "graphClass" align = "left">
            <Plot
          data={[
            {
              x: plottableMarksData.gradeKeyArray,
              y: plottableMarksData.gradeValueArray,
              type: "bar",
              marker : {
                color : ["#DC143C","#DC143C","#FF8C00","#FFFF00","#430541","#0000CD","#006400","#808080"],
              }
            },
          
          ]}
          layout={ {width: 600, height: 600, title: "GradePlot"} }
        />
          </div>

          <h2> Marks Plot</h2><br/>

      <Plot
        data = {[
          {
            x : plottableGradeData["rangeArr"],
            y : plottableGradeData["countArr"],
            type : "bar",
            marker : {
              color : plottableGradeData["distColorsArr"]
            },
            name : ""
          },
        ]  
        }
        layout = {{ width : 800, height : 600, title : "MarksPlot" }}
      >
      </Plot>
     
      <div className = "distinctionStyle">
        Number of students having first class: {plottableGradeData.firstClass} <br/> 
         Number of students having distinction: {plottableGradeData.distinction} <br/><br/><br/>
      </div>
    </div>

  )};
}

export default App;
