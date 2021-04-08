import React, { FunctionComponent } from "react";
import { Card, CardContent, CircularProgress, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Bar } from "react-chartjs-2";

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        margin: 5
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold'
    }
});

type DifficultyChartProps = {
    data: GeneralData
}

export const DifficultyChart: FunctionComponent<DifficultyChartProps> = ({data}) => {
    const classes = useStyles();

    const songsByDifficulty = data.NumSongsPlayedByDifficulty;

    const songData = [
        songsByDifficulty.Beginner ? parseInt(songsByDifficulty.Beginner) : 0,
        songsByDifficulty.Easy ? parseInt(songsByDifficulty.Easy) : 0,
        songsByDifficulty.Medium ? parseInt(songsByDifficulty.Medium) : 0,
        songsByDifficulty.Hard ? parseInt(songsByDifficulty.Hard) : 0,
        songsByDifficulty.Challenge ? parseInt(songsByDifficulty.Challenge) : 0,
    ];

    const chartJsData = {
        labels: ['Beginner', 'Basic', 'Difficult', 'Expert', 'Challenge'],
        datasets: [
            {
                label: 'Number of plays',
                data: songData,
                backgroundColor: [
                    'rgba(101,191,226,0.5)',
                    'rgba(255, 174, 0, 0.5)',
                    'rgba(255, 56, 79, 0.5)',
                    'rgba(58, 236, 40, 0.5)',
                    'rgba(234, 0, 255, 0.5)'
                ],
                borderColor: [
                    'rgba(101,191,226,1)',
                    'rgba(255, 174, 0, 1)',
                    'rgba(255, 56, 79, 1)',
                    'rgba(58, 236, 40, 1)',
                    'rgba(234, 0, 255, 1)'
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
                        beginAtZero: true,
                    }
                }
            ]
        }
    };

    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography className={classes.title}>Songs Played By Difficulty</Typography>
                {!songsByDifficulty ? <CircularProgress/> : <>
                    <Bar data={chartJsData} options={chartJSOptions} />
                </>
                }
            </CardContent>
        </Card>
    )
}
