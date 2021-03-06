import React, { FunctionComponent } from "react";

import {Box, Chip, Container, LinearProgress, Typography} from "@material-ui/core";
import { useRouter } from "next/router";
import useGet from "../../hooks/useGet";
import { Alert } from "@material-ui/lab";
import {CalorieChart} from '../../components/calorie-chart/CalorieChart';
import {RatingChart} from "../../components/rating-chart/RatingChart";
import {DifficultyChart} from "../../components/difficulty-chart/DifficultyChart";
import {StatCard} from "../../components/stat-card/StatCard";
import {MusicNote, QueueMusic} from "@material-ui/icons";
import {DIFFICULTY_MAP} from "../../constants/mappings";

const PlayerProfile: FunctionComponent = () => {
    const router = useRouter();
    const { id } = router.query;

    if(!id) {
        return (
            <Container maxWidth={false}>
                <Alert severity={'error'}>
                    Invalid URL. Profile ID not found in the URL.
                </Alert>
            </Container>
        )
    }
    const { data: Stats, isLoading, error } = useGet<PlayerProfile>(`playerProfile/${id}`);

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

    if(error) {
        return (
            <Container maxWidth={false}>
                <Alert severity={'error'}>{error}</Alert>
            </Container>
        )
    }

    if(!Stats || isLoading) {
        return (
            <Container maxWidth={false}>
                <LinearProgress/>
            </Container>
        )
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
                    <Typography variant={'h6'}>{localProfile.DisplayName}'s Profile</Typography>
                </Box>
                <Box>
                    <Chip
                        color={'primary'}
                        icon={<MusicNote/>}
                        label={'Song Scores'}
                        onClick={() => router.push(`/songList/${id}`)}
                    />&nbsp;&nbsp;&nbsp;
                    <Chip
                        color={'primary'}
                        icon={<QueueMusic/>}
                        label={'Course Scores'}
                        onClick={() => router.push(`/courseList/${id}`)}
                    />
                </Box>
                <hr />
                <Box my={2}>
                    <Typography variant={'subtitle2'}>Interesting Stats</Typography>
                    <Box display='flex' flexWrap='wrap'>
                    <StatCard value={`
              ${gameplaySeconds?.hrs}hrs,
              ${gameplaySeconds?.mins}mins, 
              ${gameplaySeconds?.secs}secs`} desc={'Total Play Time'}/>
                    <StatCard value={localProfile.LastPlayedDate} desc={'Last Played Date'}/>
                    {
                        localProfile.Song.Dir
                            ? <StatCard value={localProfile.Song?.Dir?.split('/')[2]} desc={'Last Song Played'}/>
                            : null
                    }
                    {
                        localProfile.Course.Path
                            ? <StatCard value={localProfile.Course?.Path?.split('/')[2]} desc={'Last Course Played'}/>
                            : null
                    }
                    <StatCard value={`${DIFFICULTY_MAP[localProfile.LastDifficulty]} - ${localProfile.LastStepsType.split('-')[1]}`} desc={'Last Difficulty Played'}/>
                    <StatCard value={localProfile.TotalTapsAndHolds} desc={'Total Steps'}/>
                    <StatCard value={localProfile.TotalJumps} desc={'Total Jumps'}/>
                    <StatCard value={localProfile.NumTotalSongsPlayed} desc={'Total Songs'}/>
                    <StatCard value={averageFootRating()} desc={'Average Rating'} />
                    <StatCard value={parseFloat(localProfile.TotalCaloriesBurned).toFixed(2)} desc={'Total kcal Burned'}/>
                </Box>
                </Box>
                <hr />
                <Box my={2}>
                    <Typography variant={'subtitle2'}>Graphs Of Bash</Typography>
                    <Box>
                        <DifficultyChart data={localProfile}/>
                    </Box>
                    <Box display={'block'}>
                        <RatingChart data={localProfile}/>
                    </Box>
                    <Box display={'block'}>
                        <CalorieChart data={calorieData}/>
                    </Box>
                </Box>
            </Container>
    );
}

export default PlayerProfile;
