export enum Difficulty {
    EASY = 'EASY',
    MEDIUM = 'MEDIUM',
    HARD = 'HARD'
}

export const GAME_CONFIGS: Record<Difficulty, { total_bombs: number, xSize: number, ySize: number }> = {
    [Difficulty.EASY]: { total_bombs: 10, xSize: 8, ySize: 8 },
    [Difficulty.MEDIUM]: { total_bombs: 20, xSize: 11, ySize: 10 },
    [Difficulty.HARD]: { total_bombs: 40, xSize: 13, ySize: 14 }
};
