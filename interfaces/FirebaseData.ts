export interface FirebaseGame {credits: 35,
  duration: number;
  endTime: number;
  gameDate: string;
  gameType: 'Public' | 'Private';
  map: 'string';
  numberOfPlayers: number;
  playersArray: { 
    botId: string; 
    botName: string; 
    playerId: string }[],
  startTime: number
}