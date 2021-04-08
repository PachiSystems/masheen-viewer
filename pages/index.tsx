import {Button, Container, Grid, LinearProgress, Typography} from "@material-ui/core";
import {useRouter} from "next/router";
import {makeStyles} from "@material-ui/styles";
import {useDispatch} from "react-redux";
import {setSelectedProfile} from "../states/profile/actions";
import {STEPMANIA_MACHINE_NAME} from "../constants/variables";
import useGet from "../hooks/useGet";
import {Alert} from "@material-ui/lab";
import React from "react";

const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1
    }
}));

export const Home = (): JSX.Element => {
    const router = useRouter();
    const dispatch = useDispatch();
    const classes = useStyles();
    const { data: profiles, isLoading, error } = useGet<ProfileList[]>(`playerProfileList`);

    if(error) {
        return (
            <Container maxWidth={false}>
                <Alert severity={'error'}>{error}</Alert>
            </Container>
        )
    }

    if(!profiles || isLoading) {
        return (
            <Container maxWidth={false}>
                <LinearProgress/>
            </Container>
        )
    }

    const handleProfileSelect = (profileID) => {
        router.push(`/player/${profileID}`);
    }

    return (
        <>
            <Grid container className={classes.root} spacing={2}>
                <Grid item xs={12}>
                    <Grid container justify={'center'} spacing={2}>
                        <Grid item><Typography variant={'h6'} className={'title'}>Select a profile:</Typography></Grid>
                    </Grid>
                    <Grid container justify={'center'} spacing={2}>
                        <Grid item><Button variant={"contained"} onClick={() => {
                            dispatch(setSelectedProfile({profileID: 'STEPMANIA', displayName: STEPMANIA_MACHINE_NAME}));
                            router.push('/machineStats');
                        }}>Machine</Button></Grid>
                        {
                            profiles.map((profile) => {
                                return (
                                <Grid item key={profile.profileID}>
                                    <Button variant={'contained'} onClick={() => handleProfileSelect(profile.profileID)}>
                                        {profile.displayName}
                                    </Button>
                                </Grid>
                                )
                            })
                        }
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}

export default Home;
