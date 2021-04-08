type CourseScores = {
    Course: Course[]
}

type Course = {
    Path: string;
    Trail?: CourseTrail
}

type CourseTrail = {
    CourseDifficulty: string;
    StepsType: string;
    HighScoreList: HighScoreItem | HighScoreItem[];
}
