type MachineProfile = {
    GeneralData: GeneralData;
    CalorieData: CalorieData;
    SongScores: SongScores;
}

type PlayerProfile = {
    CalorieData: CalorieData;
    CategoryScores: {};
    CourseScores: CourseScores;
    GeneralData: GeneralData;
    ScreenshotData: ScreenshotData;
    SongScores: SongScores;
}

type SelectedProfile = {
    profileID: string;
    displayName: string;
}

type ProfileList = {
    displayName: string;
    profileID: string;
}
