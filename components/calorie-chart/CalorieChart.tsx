import React, { FunctionComponent } from "react";
import { Card, CardContent, CircularProgress, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Bar } from "react-chartjs-2";
import "chartjs-plugin-zoom";

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        margin: 5,
        position: "relative"
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold'
    },
    hint: {
        marginTop: '-400px',
        padding: 10,
        borderRadius: '5px',
        marginRight: '10px'
    }
});

type CalorieChartProps = {
    data: CalorieData
}
export const CalorieChart: FunctionComponent<CalorieChartProps> = ({data}) => {
    const classes = useStyles();

    const caloriesBurned = data.CaloriesBurned;

    const chartJSData = (canvas: HTMLCanvasElement) => {
        const ctx = canvas.getContext("2d") as any;
        const height = canvas.height;
        const gradientTrans = ctx.createLinearGradient(0,0,0,Math.floor(height*3));
        gradientTrans.addColorStop(0,'rgba(161,1,0,1)');
        gradientTrans.addColorStop(1,'rgba(255,247,93,0.5)');
        const gradient = ctx.createLinearGradient(0,0,0,Math.floor(height*3));
        gradient.addColorStop(0,'rgba(161,1,0,1)');
        gradient.addColorStop(1,'rgba(255,247,93,1)');

        return {
            labels: caloriesBurned.map(data => data.Date),
            datasets: [
                {
                    label: 'Calories burned',
                    data: caloriesBurned.map(data => data.$t),
                    backgroundColor: gradientTrans,
                    borderColor: gradient,
                    borderWidth: 1
                }
            ]
        }
    };

    const xAxisMin = caloriesBurned.length >= 28 ? caloriesBurned.length - 28 : 0;

    const chartJSOptions = {
        plugins: {
            zoom: {
                pan: {
                    enabled: true,
                    mode: 'x',
                    speed: 5,
                    threshold: 10
                },
                zoom: {
                    enabled: false
                }
            }
        },
        legend: {
            display: false
        },
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true
                    }
                }
            ],
            xAxes: [{
                ticks: {
                    min: caloriesBurned[xAxisMin].Date,
                    max: caloriesBurned[caloriesBurned.length-1].Date,
                }
            }]
        }
    };
    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography className={classes.title}>Calories Burned By Date{xAxisMin > 0 ? <><br/>(click and drag for earlier dates)</> : null}</Typography>
                {!caloriesBurned ? <CircularProgress/> :
                    <>
                        <Bar data={chartJSData} options={chartJSOptions} />
                    </>
                }
            </CardContent>
        </Card>
    )
}
