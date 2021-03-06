import React, {FunctionComponent, PropsWithChildren} from "react";

import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Card,
    CardContent,
    Container,
    LinearProgress,
    Typography
} from "@material-ui/core";
import {useRouter} from "next/router";
import useGet from "../../hooks/useGet";
import {Alert} from "@material-ui/lab";
import {findHighestScore} from "../../utils/highScore";
import {makeStyles} from "@material-ui/styles";
import {DIFFICULTY_MAP} from "../../constants/mappings";

const useStyles = makeStyles({
    timingTable: {
        width: '100%',
        textAlign: 'center',
        '& td': {
            padding: '0 5px'
        }
    },
    marvelous: {
        color: '#E6E6E6',
        fontWeight: 'bold',
        textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
        textAlign: 'right',
        width: '50%'
    },
    perfect: {
        color: '#F5ED4E',
        fontWeight: 'bold',
        textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
        textAlign: 'right',
        width: '50%'
    },
    great: {
        color: '#A6FC6A',
        fontWeight: 'bold',
        textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
        textAlign: 'right',
        width: '50%'
    },
    good: {
        color: '#08A1BD',
        fontWeight: 'bold',
        textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
        textAlign: 'right',
        width: '50%'
    },
    almost: {
        color: '#BF7DE0',
        fontWeight: 'bold',
        textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
        textAlign: 'right',
        width: '50%'
    },
    miss: {
        color: '#E22B30',
        fontWeight: 'bold',
        textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
        textAlign: 'right',
        width: '50%'
    },
    ok: {
        color: '#E6E6E6',
        fontWeight: 'bold',
        textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
        textAlign: 'right',
        width: '50%'
    },
    ng: {
        color: '#E22B30',
        fontWeight: 'bold',
        textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
        textAlign: 'right',
        width: '50%'
    },
    gradeImg: {
        width: 100
    }
})

const CourseList: FunctionComponent = () => {
    const router = useRouter();
    const classes = useStyles();
    const {id} = router.query;
    let apiPath = '';
    if(id === 'machine') {
        apiPath = 'machineProfile';
    } else {
        apiPath = `playerProfile/${id}`;
    }

    if (!id) {
        return (
            <Container maxWidth={false}>
                <Alert severity={'error'}>
                    Invalid URL. Profile ID not found in the URL.
                </Alert>
            </Container>
        )
    }

    const {data: Stats, isLoading, error} = useGet<PlayerProfile | MachineProfile>(apiPath);

    if (error) {
        return (
            <Container maxWidth={false}>
                <Alert severity={'error'}>{error}</Alert>
            </Container>
        )
    }

    if (!Stats || isLoading) {
        return (
            <Container maxWidth={false}>
                <LinearProgress/>
            </Container>
        )
    }

    const localProfile = Stats.GeneralData;

    const calculateCourses = (courseScores: Course[]) => {
        let courses = {};
        courseScores.forEach((song) => {
            const courseMix = song.Path.split('/')[1];
            const courseName = song.Path.split('/')[2];
            if (typeof courses[courseMix] === 'undefined') {
                courses[courseMix] = {[courseName]: song};
            } else if (typeof courses[courseMix] !== 'undefined') {
                courses[courseMix][courseName] = song;
            }
        });
        return courses;
    }

    const courses = calculateCourses(Stats.CourseScores.Course as Course[]);

    const CourseSection = (props: PropsWithChildren<any>) => (
        <Accordion>
            <AccordionSummary>
                <Typography variant={'h6'}>
                    {props.title}
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Box display={'flex'} justifyContent={'center'} alignItems={'flex-start'}>
                    {props.children}
                </Box>
            </AccordionDetails>
        </Accordion>
    )

    const stageAwardMapping = (stageAward) => {
        switch (stageAward) {
            case 'FullComboW1':
                return <span className={classes.marvelous}>MARVELOUS FULL COMBO!</span>;
            case 'FullComboW2':
                return <span className={classes.perfect}>Perfect Full Combo</span>;
            case 'FullComboW3':
                return <span className={classes.great}>Full Combo</span>;
            case 'SingleDigitW3':
                return <><span className={classes.great}>Full Combo</span><br/><em>Single Digit Greats!</em></>
            case 'OneW3':
                return <><span className={classes.great}>Full Combo</span><br/><em>Only One Great!</em></>
            default:
                return null
        }
    }

    const renderHighScore = (songItem: Steps) => {
        const hasMultipleScores = Array.isArray(songItem.HighScoreList.HighScore);
        const highestScore = hasMultipleScores ? findHighestScore(songItem.HighScoreList.HighScore) : songItem.HighScoreList.HighScore as HighScoreObject;
        if (typeof highestScore === 'undefined') {
            return (
                <Card>
                    <CardContent>
                        <Typography variant={'body2'}>
                            <strong>Level:</strong> {songItem.Difficulty} {songItem.StepsType.split('-')[1]}<br/>
                            <strong>Song attempted:</strong> {songItem.HighScoreList.LastPlayed}<br/>
                            Played as part of a course or abandoned.
                        </Typography>
                    </CardContent>
                </Card>
            )
        }
        return (
            <Card>
                <CardContent>
                    <Typography variant={'body2'}>
                        <strong>Difficulty:</strong> {DIFFICULTY_MAP[songItem.Difficulty]} {songItem.StepsType.split('-')[1]}<br/>
                        <strong>Date
                            Achieved:</strong> {highestScore.DateTime}<br/>
                        <strong>Score: </strong> {highestScore.Score}<br/>
                        <strong>Percentage:</strong> {(parseFloat(highestScore.PercentDP) * 100).toFixed(2)}%
                        <Box my={2} display={'flex'} justifyContent={'center'}>
                            <table className={classes.timingTable}>
                                <tr>
                                    <td className={classes.marvelous}>Marvelous</td>
                                    <td align={'left'}>{highestScore.TapNoteScores.W1}</td>
                                </tr>
                                <tr>
                                    <td className={classes.perfect}>Perfect</td>
                                    <td align={'left'}>{highestScore.TapNoteScores.W2}</td>
                                </tr>
                                <tr>
                                    <td className={classes.great}>Great</td>
                                    <td align={'left'}>{highestScore.TapNoteScores.W3}</td>
                                </tr>
                                <tr>
                                    <td className={classes.good}>Good</td>
                                    <td align={'left'}>{highestScore.TapNoteScores.W4}</td>
                                </tr>
                                <tr>
                                    <td className={classes.almost}>Almost</td>
                                    <td align={'left'}>{highestScore.TapNoteScores.W5}</td>
                                </tr>
                                <tr>
                                    <td className={classes.miss}>Miss</td>
                                    <td align={'left'}>{highestScore.TapNoteScores.Miss}</td>
                                </tr>
                                <tr>
                                    <td className={classes.ok}>Hold O.K.</td>
                                    <td align={'left'}>{highestScore.HoldNoteScores.Held}</td>
                                </tr>
                                <tr>
                                    <td className={classes.ng}>Hold NG</td>
                                    <td align={'left'}>{highestScore.HoldNoteScores.LetGo}</td>
                                </tr>
                                <tr>
                                    <td className={classes.miss}>Hold Misses</td>
                                    <td align={'left'}>{highestScore.HoldNoteScores.MissedHold}</td>
                                </tr>
                                <tr>
                                    <td colSpan={2}><strong>Overall grade</strong><br/>
                                        <img className={classes.gradeImg} src={`/grades/GradeDisplay Grade Grade_${highestScore.Grade}.png`}/></td>
                                </tr>
                                <tr>
                                    <td colSpan={2}>
                                        <strong>Stage Award</strong><br/>
                                        {(typeof highestScore.StageAward === 'string') ? stageAwardMapping(highestScore.StageAward) : 'None'}
                                    </td>
                                </tr>
                            </table>
                        </Box>
                    </Typography>
                </CardContent>
            </Card>
        )
    }

    return (
        !localProfile?.DisplayName
            ? <LinearProgress/>
            : <Container maxWidth={false}>
                <Box my={2}>
                    <Typography variant={'h6'}>Song Scores</Typography>
                </Box>
                {
                    Object.entries(courses).map((mix) => {
                        const [mixName, courses] = mix;
                        const songList = Object.entries(courses).map((course) => {
                            return course;
                        })
                        return (
                            <Box my={2} key={mixName}>
                                <Typography variant={'h5'}>{mixName}</Typography>
                                {
                                    songList.map((course) => {
                                        const [courseTitle, details] = course;

                                        /**
                                         * Figuring out this flow...
                                         * 1. Is details.Steps an array?
                                         *      No: This is a single entry.
                                         *          Is the HighScoreList.HighScore an array?
                                         *          No: This is the highest score.
                                         *          Yes: Find the highest score in the array.
                                         *      Yes: Run through each item checking the HighScoreList.HighScore as above.
                                         */

                                        const isMultiEntry = Array.isArray(details.Trail);

                                        if (isMultiEntry) {
                                            // Run through each item.
                                            return (
                                                <CourseSection title={courseTitle}>
                                                    {
                                                        details.Trail.map((steps) => {
                                                            return renderHighScore(steps)
                                                        })
                                                    }
                                                </CourseSection>
                                            )
                                        } else {
                                            // Render out a single item.
                                            return (
                                                <CourseSection title={courseTitle}>
                                                    {renderHighScore(details.Trail)}
                                                </CourseSection>
                                            )
                                        }
                                    })
                                }
                            </Box>
                        )
                    })
                }
            </Container>
    );
}

export default CourseList;
