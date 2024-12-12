import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';
import { Bar } from "react-chartjs-2";
import {CategoryScale} from 'chart.js'; 
Chart.register(CategoryScale);

// function StudentDetails() {
//     const [tempdata, setData] = React.useState([]);
  
//     useEffect(() => {
//       fetch('http://localhost:3005/api/students')
//         .then(response => response.json())
//         .then(data => setData(data));
//     }, []);
// }
const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top", // Set the legend position to top
        align: "end", // Align the legend to the end (right) of the container
      },
      title: {
        display: true,
        text: "Student Marks",
      },
    },
    layout: {
        padding: {
          left: 50,
          right: 50,
          top: 50,
          bottom: 50,
        },
      },
      // Set the aspect ratio of the chart
      aspectRatio: 2,
  };  

const tempdata =
  [{"Name":"Rahul","RollNumber":"CB.EN.U4CSE201","sub1mark":90,"sub2mark":80,"sub3mark":85,"sub4mark":95,"sub5mark":92,"sub1atten":76,"sub2atten":85,"sub3atten":90,"sub4atten":95,"sub5atten":80,"publications":1,"AcademicAchv":0,"Sports":0},
    {"Name":"Priya","RollNumber":"CB.EN.U4CSE202","sub1mark":76,"sub2mark":95,"sub3mark":90,"sub4mark":80,"sub5mark":75,"sub1atten":85,"sub2atten":95,"sub3atten":90,"sub4atten":80,"sub5atten":75,"publications":0,"AcademicAchv":1,"Sports":1},
    {"Name":"Ajay","RollNumber":"CB.EN.U4CSE203","sub1mark":78,"sub2mark":90,"sub3mark":85,"sub4mark":95,"sub5mark":92,"sub1atten":90,"sub2atten":74,"sub3atten":85,"sub4atten":90,"sub5atten":95,"publications":1,"AcademicAchv":0,"Sports":1},    
    {"Name":"Sneha","RollNumber":"CB.EN.U4CSE204","sub1mark":95,"sub2mark":85,"sub3mark":80,"sub4mark":90,"sub5mark":75,"sub1atten":85,"sub2atten":90,"sub3atten":95,"sub4atten":80,"sub5atten":75,"publications":0,"AcademicAchv":1,"Sports":0},
    {"Name":"Rajesh","RollNumber":"CB.EN.U4CSE205","sub1mark":90,"sub2mark":80,"sub3mark":85,"sub4mark":95,"sub5mark":92,"sub1atten":80,"sub2atten":85,"sub3atten":90,"sub4atten":95,"sub5atten":80,"publications":1,"AcademicAchv":1,"Sports":0},
    {"Name":"Aishwarya","RollNumber":"CB.EN.U4CSE206","sub1mark":85,"sub2mark":95,"sub3mark":90,"sub4mark":80,"sub5mark":75,"sub1atten":85,"sub2atten":95,"sub3atten":90,"sub4atten":80,"sub5atten":75,"publications":0,"AcademicAchv":0,"Sports":1},
    {"Name":"Vijay","RollNumber":"CB.EN.U4CSE207","sub1mark":79,"sub2mark":90,"sub3mark":85,"sub4mark":95,"sub5mark":92,"sub1atten":90,"sub2atten":80,"sub3atten":85,"sub4atten":90,"sub5atten":95,"publications":1,"AcademicAchv":0,"Sports":1},
    {"Name":"Swati","RollNumber":"CB.EN.U4CSE208","sub1mark":95,"sub2mark":85,"sub3mark":80,"sub4mark":90,"sub5mark":75,"sub1atten":85,"sub2atten":90,"sub3atten":95,"sub4atten":80,"sub5atten":75,"publications":0,"AcademicAchv":0,"Sports":0},
    {"Name":"Amit","RollNumber":"CB.EN.U4CSE209","sub1mark":90,"sub2mark":80,"sub3mark":85,"sub4mark":95,"sub5mark":92,"sub1atten":80,"sub2atten":85,"sub3atten":90,"sub4atten":95,"sub5atten":80,"publications":1,"AcademicAchv":1,"Sports":0},
    {"Name":"Neha","RollNumber":"CB.EN.U4CSE210","sub1mark":74,"sub2mark":95,"sub3mark":90,"sub4mark":80,"sub5mark":75,"sub1atten":85,"sub2atten":95,"sub3atten":90,"sub4atten":80,"sub5atten":75,"publications":0,"AcademicAchv":0,"Sports":1},
    {"Name":"Sachin","RollNumber":"CB.EN.U4CSE211","sub1mark":80,"sub2mark":90,"sub3mark":85,"sub4mark":95,"sub5mark":92,"sub1atten":90,"sub2atten":80,"sub3atten":85,"sub4atten":90,"sub5atten":95,"publications":1,"AcademicAchv":0,"Sports":1},
    {"Name":"Pooja","RollNumber":"CB.EN.U4CSE212","sub1mark":95,"sub2mark":85,"sub3mark":80,"sub4mark":90,"sub5mark":75,"sub1atten":85,"sub2atten":90,"sub3atten":95,"sub4atten":80,"sub5atten":75,"publications":0,"AcademicAchv":1,"Sports":0},
    {"Name":"Rajiv","RollNumber":"CB.EN.U4CSE213","sub1mark":90,"sub2mark":80,"sub3mark":85,"sub4mark":95,"sub5mark":92,"sub1atten":80,"sub2atten":85,"sub3atten":90,"sub4atten":95,"sub5atten":80,"publications":1,"AcademicAchv":0,"Sports":0},
    {"Name":"Kavita","RollNumber":"CB.EN.U4CSE214","sub1mark":85,"sub2mark":95,"sub3mark":90,"sub4mark":80,"sub5mark":75,"sub1atten":85,"sub2atten":95,"sub3atten":90,"sub4atten":80,"sub5atten":75,"publications":0,"AcademicAchv":1,"Sports":1},
    {"Name":"Manoj","RollNumber":"CB.EN.U4CSE215","sub1mark":76,"sub2mark":90,"sub3mark":85,"sub4mark":95,"sub5mark":92,"sub1atten":90,"sub2atten":77,"sub3atten":85,"sub4atten":90,"sub5atten":95,"publications":1,"AcademicAchv":0,"Sports":1},
    {"Name":"Anita","RollNumber":"CB.EN.U4CSE216","sub1mark":95,"sub2mark":85,"sub3mark":80,"sub4mark":90,"sub5mark":75,"sub1atten":85,"sub2atten":90,"sub3atten":95,"sub4atten":80,"sub5atten":75,"publications":0,"AcademicAchv":0,"Sports":0},
    {"Name":"Alok","RollNumber":"CB.EN.U4CSE217","sub1mark":90,"sub2mark":80,"sub3mark":85,"sub4mark":95,"sub5mark":92,"sub1atten":77,"sub2atten":85,"sub3atten":90,"sub4atten":95,"sub5atten":80,"publications":1,"AcademicAchv":1,"Sports":0},
    {"Name":"Smita","RollNumber":"CB.EN.U4CSE218","sub1mark":85,"sub2mark":95,"sub3mark":90,"sub4mark":80,"sub5mark":75,"sub1atten":85,"sub2atten":95,"sub3atten":90,"sub4atten":80,"sub5atten":75,"publications":0,"AcademicAchv":0,"Sports":1},
    {"Name":"Mohan","RollNumber":"CB.EN.U4CSE219","sub1mark":80,"sub2mark":90,"sub3mark":85,"sub4mark":95,"sub5mark":92,"sub1atten":90,"sub2atten":80,"sub3atten":85,"sub4atten":90,"sub5atten":95,"publications":1,"AcademicAchv":0,"Sports":1},
    {"Name":"Sushma","RollNumber":"CB.EN.U4CSE220","sub1mark":95,"sub2mark":85,"sub3mark":80,"sub4mark":90,"sub5mark":75,"sub1atten":85,"sub2atten":90,"sub3atten":95,"sub4atten":80,"sub5atten":75,"publications":0,"AcademicAchv":1,"Sports":0}];

const sub1Marks = tempdata.map(record => record.sub1mark); // Extract sub1mark values
const averageSub1Mark = sub1Marks.reduce((total, mark) => total + mark, 0) / sub1Marks.length;
const sub2Marks = tempdata.map(record => record.sub1mark); // Extract sub1mark values
const averageSub2Mark = sub1Marks.reduce((total, mark) => total + mark, 0) / sub1Marks.length;
const sub3Marks = tempdata.map(record => record.sub1mark); // Extract sub1mark values
const averageSub3Mark = sub1Marks.reduce((total, mark) => total + mark, 0) / sub1Marks.length;
const sub4Marks = tempdata.map(record => record.sub1mark); // Extract sub1mark values
const averageSub4Mark = sub1Marks.reduce((total, mark) => total + mark, 0) / sub1Marks.length;
const sub5Marks = tempdata.map(record => record.sub1mark); // Extract sub1mark values
const averageSub5Mark = sub1Marks.reduce((total, mark) => total + mark, 0) / sub1Marks.length;

const sub1Attens = tempdata.map(record => record.sub1atten); // Extract sub1atten values
const averageSub1Attens = sub1Attens.reduce((total, mark) => total + mark, 0) / sub1Attens.length;

const sub2Attens = tempdata.map(record => record.sub2atten); // Extract sub2atten values
const averageSub2Attens = sub2Attens.reduce((total, mark) => total + mark, 0) / sub2Attens.length;

const sub3Attens = tempdata.map(record => record.sub3atten); // Extract sub3atten values
const averageSub3Attens = sub3Attens.reduce((total, mark) => total + mark, 0) / sub3Attens.length;

const sub4Attens = tempdata.map(record => record.sub4atten); // Extract sub4atten values
const averageSub4Attens = sub4Attens.reduce((total, mark) => total + mark, 0) / sub4Attens.length;

const sub5Attens = tempdata.map(record => record.sub5atten); // Extract sub5atten values
const averageSub5Attens = sub5Attens.reduce((total, mark) => total + mark, 0) / sub5Attens.length;


const data = {
  labels: ["Sub1", "Sub2", "Sub3", "Sub4", "Sub5"],
  datasets: [
    {
      label: "Marks",
      data: [averageSub1Mark, averageSub2Mark, averageSub3Mark, averageSub4Mark, averageSub5Mark],
      backgroundColor: "green",
    },
    {
      label: "Attendance",
      data: [averageSub1Attens, averageSub2Attens, averageSub3Attens, averageSub4Attens, averageSub5Attens],
      backgroundColor: "blue",
    },
  ],
};


export default function App() {
  return (
    <div className="chart">
      <Bar options={options} data={data} />
    </div>
  );
}