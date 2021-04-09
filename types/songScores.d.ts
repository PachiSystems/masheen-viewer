type SongScores = {
    Song: Song | Song[]
}

type Song = {
    Dir: string;
    Steps: Steps | Steps[];
}

type Steps = {
    Difficulty: string;
    HighScoreList: HighScoreItem;
    StepsType: string;
}

type HighScoreItem = {
    HighGrade: string;
    HighScore: HighScoreObject | HighScoreObject[]
    LastPlayed: string;
    NumTimesPlayed: string;
}

type HoldNoteScores = {
    Held: string;
    LetGo: string;
    MissedHold: string;
}

type RadarValues = {
    Air: string;
    Chaos: string;
    Fakes: string;
    Freeze: string;
    Hands: string;
    Holds: string;
    Jumps: string;
    Lifts: string;
    Mines: string;
    Notes: string;
    Rolls: string;
    Stream: string;
    TapdAndHolds: string;
    Voltage: string;
}

type TapNoteScores = {
    AvoidMine: string;
    CheckpointHit: string;
    CheckpointMiss: string;
    HitMine: string;
    Miss: string;
    W1: string;
    W2: string;
    W3: string;
    W4: string;
    W5: string;
}

type HighScoreObject = {
    DateTime: string;
    Disqualified: string;
    Grade: string;
    HoldNoteScores: HoldNoteScores;
    LifeRemainingSeconds: string;
    MachineGuid: string;
    MaxCombo: string;
    Modifiers: string;
    Name: object;
    PeakComboAward: object;
    PercentDP: string;
    PlayerGuid: string;
    ProductID: string;
    RadarValues: RadarValues
    Score: string;
    StageAward: object;
    SurviveSeconds: string;
    TapNoteScores: TapNoteScores
}
