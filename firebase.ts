import firebaseAdmin from "firebase-admin";
import { gameInfo, newGame } from "./interfaces/userInterfaces";

const serviceAccount = JSON.parse(process.env.GOOGLE_CREDS ?? "");

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
  databaseURL:
    "https://rawbotz-46ddb-default-rtdb.europe-west1.firebasedatabase.app",
});

export const db = firebaseAdmin.database();
export const auth = firebaseAdmin.auth();

export const getBotSessionId = (
  botId: string,
  callback: (id: string) => void
): void => {
  var ref = db.ref(`bots/${botId}`);
  ref.once("value", function (snapshot) {
    if (!snapshot.val().sessionId) {
      callback("");
    }
    callback(snapshot.val().sessionId);
  });
};

export const returnGames = (
  year: string,
  month: string,
  callback: (games?: newGame[] | undefined) => void
) => {
  try {
    db.ref(`games/${year}/${month}`)
      .once("value", (snapshot) => {})
      .then((snapshot) => {
        if (snapshot.hasChildren()) {
          const games = Object.keys(snapshot.val()).map(
            (key) => snapshot.val()[key] as unknown as newGame
          );
          return games;
        }
      })
      .then((games) => {
        if (games !== undefined) {
          return callback(games);
        }
        return callback(undefined);
      });
  } catch (e) {
    callback(undefined);
  }
};

export const checkIfGameOverLap = (
  year: string,
  month: string,
  startTime: number,
  endtime: number,
  map: string,
  callback: (isOverLap: boolean) => void
): void => {
  returnGames(year, month, (games) => {
    if (games === undefined || null) {
      return callback(false);
    }

    if (
      games.find(
        (game) => (game.startTime >= startTime && game.startTime <= endtime) || (game.endTime >= startTime && game.endTime <= endtime)
      )
    ) {
      return callback(true);
    }

    return false;
  });
};
