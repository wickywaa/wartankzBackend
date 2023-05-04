export interface Player {
    playerId: string;
    botId: string;
    botName: string;
}
  
export interface IGame {
    gameType: String;
    map: string;
    numberOfPlayers: number;
    playersArray: Player[];
    duration: number;
    gameDate: string;
    startTime: number;
    endTime: number;
    credits: number;
  }