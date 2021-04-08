import {Button, Grid, Typography} from "@material-ui/core";
import {useRouter} from "next/router";
import {makeStyles} from "@material-ui/styles";
import {useDispatch} from "react-redux";
import {setSelectedProfile} from "../states/profile/actions";
import {STEPMANIA_MACHINE_NAME} from "../constants/variables";

const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1
    }
}));

export const Home = (): JSX.Element => {
    const router = useRouter();
    const dispatch = useDispatch();
    const classes = useStyles();

    return (
        <>

            <Grid container className={classes.root} spacing={2}>
                <Grid item xs={12}>
                    <Grid container justify={'center'} spacing={2}>
                        <Grid item><Typography variant={'h6'} className={'title'}>Select a mode:</Typography></Grid>
                    </Grid>
                    <Grid container justify={'center'} spacing={2}>
                        <Grid item><Button variant={"contained"} onClick={() => {
                            dispatch(setSelectedProfile({profileID: 'STEPMANIA', displayName: STEPMANIA_MACHINE_NAME}));
                            router.push('/machineStats');
                        }}>Machine</Button></Grid>
                        <Grid item><Button variant={"disabled"}>Players</Button></Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}

export default Home;
