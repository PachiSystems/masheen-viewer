import React, { FunctionComponent } from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

type StatCardProps = {
    value: string;
    desc: string;
}

const useStyles = makeStyles({
    root: {
        maxWidth: 275,
        margin: 5
    },
    title: {
        fontSize: 14
    }
})

export const StatCard: FunctionComponent<StatCardProps> = ({
                                                               value,
                                                               desc }) => {

    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography variant={'subtitle1'}>
                    {desc}
                </Typography>
                <Typography variant="subtitle2">
                    {value}
                </Typography>
            </CardContent>
        </Card>
    );
}
