type Modifiers = {
    dance: string;
}

type NumSongsPlayedByDifficulty = {
    Beginner?: string;
    Easy?: string;
    Medium?: string;
    Hard?: string;
    Challenge?: string;
}

type NumSongsPlayedByMeter = {
    Meter1?: string;
    Meter2?: string;
    Meter3?: string;
    Meter4?: string;
    Meter5?: string;
    Meter6?: string;
    Meter7?: string;
    Meter8?: string;
    Meter9?: string;
    Meter10?: string;
    Meter11?: string;
    Meter12?: string;
    Meter13?: string;
    Meter14?: string;
    Meter15?: string;
    Meter16?: string;
    Meter17?: string;
    Meter18?: string;
    Meter19?: string;
}

type PlayMode = {
    Nonstop: string;
    Regular: string;
}

type Style = {
    Game: string;
    Style: string;
    $t: string;
}

type NumStagesPassedByGrade = {
    Tier01?: string;
    Tier02?: string;
    Tier03?: string;
    Tier04?: string;
    Tier05?: string;
    Tier06?: string;
    Tier07?: string;
    Tier08?: string;
    Tier09?: string;
}

type GeneralData = {
    BirthYear: string;
    CharacterID: string;
    Course: Course;
    CurrentCombo: string;
    DefaultModifiers: Modifiers;
    DisplayName: string;
    GoalCalories: string;
    GoalSeconds: string;
    GoalType: string;
    Guid: string;
    IgnoreStepCountCalories: string;
    IsMachine: string;
    IsMale: string;
    LastCourseDifficulty: string;
    LastDifficulty: string;
    LastPlayedDate: string;
    LastPlayedMachineGuid: string;
    LastStepsType: string;
    LastUsedHighScoreName: object;
    NumExtraStagesFailed: string;
    NumExtraStagesPassed: string;
    NumSongsPlayedByDifficulty: NumSongsPlayedByDifficulty;
    NumSongsPlayedByMeter: NumSongsPlayedByMeter;
    NumSongsPlayedByPlayMode: PlayMode;
    NumSongsPlayedByStyle: {
        Style: Style[]
    };
    NumStagesPassedByGrade: NumStagesPassedByGrade;
    NumStagesPassedByPlayMode: PlayMode;
    NumToasties: string;
    NumTotalSongsPlayed: string;
    Song: {Dir: string;}
    SortOrder: string;
    TotalCaloriesBurned: string;
    TotalDancePoints: string;
    TotalGameplaySeconds: string;
    TotalHands: string;
    TotalHolds: string;
    TotalJumps: string;
    TotalLifts: string;
    TotalMines: string;
    TotalRolls: string;
    TotalSessionSeconds: string;
    TotalSessions: string;
    TotalTapsAndHolds: string;
    Unlocks: {}
    UserTable: {}
    Voomax: string;
    WeightPounds: string;
}
