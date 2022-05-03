// import Axios from 'axios'
// import React from 'react'
// import { useEffect } from 'react'
// import { useState,useRef } from 'react'
// import { Chart asCharj} from 'react-chartjs-2'
// import { API } from '../config'

// import Layout from '../core/Layout'

// import { Bar } from "react-chartjs-2"
// import { Chart } from 'chart.js'

// export default function Stats() {
//   const [catStats,setCatStats]=useState([])

//   useEffect(()=>{
//     Axios.get(`${API}/catStats`).then((res)=>{
//       // setCatStats(res.data)
//     },[])
//   })
  
  
//   const chartConfig = {
//     type: 'bar',
//     data: {
//       labels:[1,2,3,4,5],
//       data: [12, 19, 3, 5, 2, 3]
//     },
//     options: {
//       scales: {
//         yAxes: [
//           {
//             ticks: {
//               beginAtZero: true
//             }
//           }
//         ]
//       }
//     }
//   };
// const Chart = () => {
//   const chartContainer = useRef(null);
//   const [chartInstance, setChartInstance] = useState(null);

//   useEffect(() => {
//     if (chartContainer && chartContainer.current) {
//       const newChartInstance = new Chartjs(chartContainer.current, chartConfig);
//       setChartInstance(newChartInstance);
//     }
//   }, [chartContainer]);

//   return (
//     <div>
//       <canvas ref={chartContainer} />
//     </div>
//   );
// };
// }



import React from 'react';
import {Chart as ChartJS, BarElement, CategoryScale, LinearScale} from 'chart.js'
import {Bar } from 'react-chartjs-2'

ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale
)
//props-labels,data
const BarGraph = (props) => {

   var data = {
        labels: props.labels,
        datasets: [{
            label: '# of Votes',
            data: props.data,
            backgroundColor: [
               "  rgba (255, 244, 76, 1)" ,//blue
               "  rgba (119, 221, 119, 1)" ,
              "   rgba (253, 103, 135, 1)" ,
              "   rgba (40, 142, 235, 1)" //yellow


//                 "rgba(255, 0, 0, 1)",

// "rgba(0, 0, 255, 1)"
                // 'rgba(255, 99, 132, 0.2)',
                // 'rgba(54, 162, 235, 0.2)',
                // 'rgba(255, 206, 86, 0.2)',
                // 'rgba(75, 192, 192, 0.2)',
                // 'rgba(153, 102, 255, 0.2)',
                // 'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    }
    var options = {
        
        maintainAspectRatio:false,
        dataset:{
            active: true
        },
        scales: {
            y: {
                beginAtZero: true
            }
        },  
            legend: {
                labels: {
                    fontSize:20
                }
            }
        
    }

    return (
        <div style={{
            alignContent:"center"
        }}>
        <Bar
        data={data}
        height={400}
        options = {options}
        />
        </div>
    )
}

export default BarGraph;