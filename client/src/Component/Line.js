
import  {COLORS}  from '../utils/constants';
import React from "react";
import {LineChart,XAxis,YAxis,CartesianGrid,Tooltip,Legend,Line} from 'recharts'
export const series = [
    {
      name: "Total",
      data: [19, 9, 20],
      color: COLORS.total,
    },
    {
      name: "Pending",
      data: [12, 6, 15],
      color: COLORS.pending,
    },
    {
      name: "Fulfilled",
      data: [7, 3, 5],
      color: COLORS.accepted,
    },
];

const categories = ["January", "February", "March"];

export const BulildLine = (dates) =>{
    const data = [
        {name:'Page A', uv:1000, pv:2400, amt:2400},
        {name:'Page B', uv:4000, pv:2300, amt:2400},
        {name:'Page C', uv:3000, pv:2100, amt:2400},    
        {name:'Page D', uv:4000, pv:400, amt:2400}
    ]
    console.log("sdas",dates.dates)
    console.log(typeof(dates.dates[0].value))

    if(dates.lenght){
        return (
            <LineChart width={600} height={300} data = {data}
            margin={{top:5, right:30, left:20,bottom:5}}>
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3 " />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="uv" stroke="#8884d8" activeDot = {{r:7}} />
            </LineChart>
    
        );
    }
    else{
        return(
            <></>
        )
    }
}