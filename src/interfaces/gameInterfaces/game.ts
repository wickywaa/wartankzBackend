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
    gameStartDate: string;
    gameEndDate:string;
    startTime: number;
    endTime: number;
    credits: number;
  }
  export interface databaseGame extends IGame {
    _id:string;
    gameType: String;
    map: string;
    numberOfPlayers: number;
    playersArray: Player[];
    duration: number;
    gameStartDate: string;
    gameEndDate:string;
    startTime: number;
    endTime: number;
    credits: number;
  }