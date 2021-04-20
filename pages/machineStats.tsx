import React, {FunctionComponent} from "react";

import {Box, Chip, Container, LinearProgress, Typography} from "@material-ui/core";
import useGet from "../hooks/useGet";
import {Alert} from "@material-ui/lab";
import {StatCard} from "../components/stat-card/StatCard";
import {DifficultyChart} from "../components/difficulty-chart/DifficultyChart";
import {RatingChart} from "../components/rating-chart/RatingChart";
import {CalorieChart} from "../components/calorie-chart/CalorieChart";
import {STEPMANIA_MACHINE_NAME} from "../constants/variables";
import {MusicNote, QueueMusic} from "@material-ui/icons";
import {useRouter} from "next/router";

const MachineProfile: FunctionComponent = () => {

    const router = useRouter();
    const { data: Stats, isLoading, error } = useGet<MachineProfile>(`machineProfile`);

    if(!Stats || isLoading) {
        return (
            <Container maxWidth={false}>
                <LinearProgress/>
            </Container>
        )
    }

    if(error) {
        return (
            <Container maxWidth={false}>
                <Alert severity={'error'}>{error}</Alert>
            </Container>
        )
    }

    const getTotalGameplayTime = (seconds: string) => {
        let totalSeconds = parseInt(seconds);
        const hrs = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        const mins = Math.floor(totalSeconds / 60);
        const secs = totalSeconds % 60;
        return {
            hrs,
            mins,
            secs
        }
    }

    const localProfile = Stats.GeneralData;
    const calorieData = Stats.CalorieData;
    const gameplaySeconds = getTotalGameplayTime(localProfile.TotalGameplaySeconds);

    const averageFootRating = () => {
        let levelTotals = 0;
        let numberOfEntries = 0;
        Object.entries(localProfile.NumSongsPlayedByMeter).map((o) => {
            const level = parseInt(o[0].replace('Meter', ''));
            const playedTimes = parseInt(o[1] as string);
            levelTotals += level * playedTimes;
            numberOfEntries += playedTimes;
            return true;
        });
        const average = Math.round(levelTotals / numberOfEntries);
        return average.toString();
    }

    return (
        !localProfile?.DisplayName
            ? <LinearProgress />
            : <Container maxWidth={false}>
                <Box my={2}>
                    <Typography variant={'h5'}>{STEPMANIA_MACHINE_NAME} Profile</Typography>
                </Box>
                <Box>
                    <Chip
                        color={'primary'}
                        icon={<MusicNote/>}
                        label={'Song Scores'}
                        onClick={() => router.push(`/songList/machine`)}
                    />&nbsp;&nbsp;&nbsp;
                    <Chip
                        color={'primary'}
                        icon={<QueueMusic/>}
                        label={'Course Scores'}
                        onClick={() => router.push(`/courseList/machine`)}
                    />
                </Box>
                <hr />
                <Box my={2}>
                    <Typography variant={'h6'}>Interesting Stats</Typography>
                    <Box display='flex' flexWrap='wrap'>
                        <StatCard value={`${gameplaySeconds?.hrs}hrs,${gameplaySeconds?.mins}mins,${gameplaySeconds?.secs}secs`} desc={'Total Play Time'}/>
                        <StatCard value={localProfile.LastPlayedDate} desc={'Last Played Date'}/>
                        <StatCard value={localProfile.TotalTapsAndHolds} desc={'Total Steps'}/>
                        <StatCard value={localProfile.TotalJumps} desc={'Total Jumps'}/>
                        <StatCard value={localProfile.NumTotalSongsPlayed} desc={'Total Songs'}/>
                        <StatCard value={averageFootRating()} desc={'Average Rating'} />
                        <StatCard value={parseFloat(localProfile.TotalCaloriesBurned).toFixed(2)} desc={'Total kcal Burned'}/>
                    </Box>
                </Box>
                <hr />
                <Box my={2}>
                    <Typography variant={'h6'}>Graphs Of Bash</Typography>
                    <Box display={'block'} my={2}>
                        <DifficultyChart data={localProfile}/>
                    </Box>
                    <Box display={'block'} my={2}>
                        <RatingChart data={localProfile}/>
                    </Box>
                    <Box display={'block'} my={2}>
                        <CalorieChart data={calorieData}/>
                    </Box>
                </Box>
            </Container>
    );
}

export default MachineProfile;
