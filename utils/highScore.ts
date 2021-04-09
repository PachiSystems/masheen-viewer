export const findHighestScore = (highScore: HighScoreObject | HighScoreObject[]): HighScoreObject => {
    if(Array.isArray(highScore)) {
        const highestScore = Math.max.apply(Math, highScore.map((scoreObj) => scoreObj.PercentDP));
        const highestScoreObj = highScore.find((scoreObj) => {
            return scoreObj.PercentDP == highestScore
        });
        return highestScoreObj;
    } else {
        return highScore;
    }
}
