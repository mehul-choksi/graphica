import React, { Component } from 'react';
import Plot from 'react-plotly.js';
import './StudentApp.css'

export default class StudentApp extends Component {

    state = {
        studentData : {}
    }

    componentDidMount(){
        fetch("/student/api/T150054261").then((response) => response.json()).then((responseJson) => {
            const studentData = responseJson;
            this.setState({studentData});
            console.log(this.state.studentData);
        })
    }

    showRollNo = () =>{
        try{
            var rollNo = this.state.studentData[0].roll_no;
            return rollNo;
        }
        catch(err){
            return "some-roll-no";
        }
    }

    showSgpa = () =>{
        try{
            var sgpa = this.state.studentData[2].sgpa;
            return sgpa;
        }
        catch(err){
            return "err: unable-to-fetch-sgpa";
        }
    }

    showPercentage = () => {
        var scoreJson = this.state.studentData[0];
        console.log(scoreJson);
        var total = 0;
        var maxBound = 0;
        for(var key in scoreJson){
            try{
                if(key.endsWith("_score")){
                    total += scoreJson[key]
                    maxBound += 100;
                } 
            }
            catch(err){
                console.log("Non number encountered");
                return 0;
            }
            
            
        }
        return ((total/maxBound) * 100);
    }

    getStudentPlotData = () => {
        var percentileJson = this.state.studentData[1];
        var percentileArray = [];
        var subjectArray = [];

        var temp;
        for(var key in percentileJson){
            if(key.endsWith("percentile")){
                percentileArray.push(percentileJson[key]);
                temp = key.split("_");
                subjectArray.push(temp[0]);
            }
        }
        percentileArray.push(percentileArray[0]);
        subjectArray.push(subjectArray[0]);
        return {
            percentiles : percentileArray,
            subjects : subjectArray
        }
    }

    showRank = () => {
        try{
            var rank = this.state.studentData[3].rank;
            return rank;
        }
        catch(err){
            return -1;
        }
    }

    render(){
        var plotData = this.getStudentPlotData();

        return (<div className = "StudentApp">
            <h2>Student Report for Roll no.: {this.showRollNo()}</h2>
            
            
                <div className = "custom">
                    <h2>Grade Point : {this.showSgpa()} </h2>
                    <br/>
                    <h2> Theory Percentage: {this.showPercentage()}</h2>
                    <br/>
                
                    <h2>Rank in department: {this.showRank()}</h2>
                    <br/> 
                
                    <h2>Percentile based performance</h2>
                    <br/>
                </div>
                
             <br/>

            <Plot 
                data = {[{
                    type: 'scatterpolar',
                    r: plotData.percentiles,
                    theta: plotData.subjects,
                    fill: 'toself'
                }]
            }

            layout = {{
            polar: {
                radialaxis: {
                visible: true,
                range: [0, 100]
                }
            },
            showlegend: false
            }}>

            </Plot>
        </div>)
    }

}