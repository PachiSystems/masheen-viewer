import React, { FunctionComponent } from "react";
import { Card, CardContent, CircularProgress, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Bar } from "react-chartjs-2";

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        margin: 5,
        position: "relative"
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold'
    }
});

type RatingChartProps = {
    data: GeneralData
}
export const RatingChart: FunctionComponent<RatingChartProps> = ({data}) => {
    const classes = useStyles();

    const songByMeter = data.NumSongsPlayedByMeter;

    const meterData = [
        songByMeter.Meter1 ? parseInt(songByMeter.Meter1) : 0,
        songByMeter.Meter2 ? parseInt(songByMeter.Meter2) : 0,
        songByMeter.Meter3 ? parseInt(songByMeter.Meter3) : 0,
        songByMeter.Meter4 ? parseInt(songByMeter.Meter4) : 0,
        songByMeter.Meter5 ? parseInt(songByMeter.Meter5) : 0,
        songByMeter.Meter6 ? parseInt(songByMeter.Meter6) : 0,
        songByMeter.Meter7 ? parseInt(songByMeter.Meter7) : 0,
        songByMeter.Meter8 ? parseInt(songByMeter.Meter8) : 0,
        songByMeter.Meter9 ? parseInt(songByMeter.Meter9) : 0,
        songByMeter.Meter10 ? parseInt(songByMeter.Meter10) : 0,
        songByMeter.Meter11 ? parseInt(songByMeter.Meter11) : 0,
        songByMeter.Meter12 ? parseInt(songByMeter.Meter12) : 0,
        songByMeter.Meter13 ? parseInt(songByMeter.Meter13) : 0,
        songByMeter.Meter14 ? parseInt(songByMeter.Meter14) : 0,
        songByMeter.Meter15 ? parseInt(songByMeter.Meter15) : 0,
        songByMeter.Meter16 ? parseInt(songByMeter.Meter16) : 0,
        songByMeter.Meter17 ? parseInt(songByMeter.Meter17) : 0,
        songByMeter.Meter18 ? parseInt(songByMeter.Meter18) : 0,
        songByMeter.Meter19 ? parseInt(songByMeter.Meter19) : 0,
    ] as any;

    const chartJSData = {
        labels: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19],
        datasets: [
            {
                label: 'Number of plays',
                data: meterData,
                backgroundColor: [
                    'rgba(101,191,226,0.5)',
                    'rgba(147,186,158,0.5)',
                    'rgba(193,181,90,0.5)',
                    'rgba(240,176,23,0.5)',
                    'rgba(255,150,16,0.5)',
                    'rgba(255,115,40,0.5)',
                    'rgba(255,80,63,0.5)',
                    'rgba(235,74,75,0.5)',
                    'rgba(176,128,63,0.5)',
                    'rgba(117,182,52,0.5)',
                    'rgba(58,236,40,0.5)',
                    'rgba(58,236,40,0.5)',
                    'rgba(58,236,40,0.5)',
                    'rgba(58,236,40,0.5)',
                    'rgba(58,236,40,0.5)',
                    'rgba(116,158,111,0.5)',
                    'rgba(174,80,182,0.5)',
                    'rgba(234,0,255,0.5)',
                    'rgba(234,0,255,0.5)',
                ],
                borderColor: [
                    'rgba(101,191,226,1)',
                    'rgba(147,186,158,1)',
                    'rgba(193,181,90,1)',
                    'rgba(240,176,23,1)',
                    'rgba(255,150,16,1)',
                    'rgba(255,115,40,1)',
                    'rgba(255,80,63,1)',
                    'rgba(235,74,75,1)',
                    'rgba(176,128,63,1)',
                    'rgba(117,182,52,1)',
                    'rgba(58,236,40,1)',
                    'rgba(58,236,40,1)',
                    'rgba(58,236,40,1)',
                    'rgba(58,236,40,1)',
                    'rgba(58,236,40,1)',
                    'rgba(116,158,111,1)',
                    'rgba(174,80,182,1)',
                    'rgba(234,0,255,1)',
                    'rgba(234,0,255,1)',
                ],
                borderWidth: 1
            }
        ]
    };

    const chartJSOptions = {
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
            ]
        }
    };

    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography className={classes.title}>Songs Played By Foot Rating</Typography>
                {!songByMeter ? <CircularProgress/> :
                    <>
                        <Bar data={chartJSData} options={chartJSOptions} />
                    </>
                }
            </CardContent>
        </Card>
    )
}
