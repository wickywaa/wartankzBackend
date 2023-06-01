export interface createAccessTokenRequest {
    body:{
        botId:string;
        startTime: number;
        endTime:number;
        gameId:string;
        id:string;
        idToken:string;
    }
}