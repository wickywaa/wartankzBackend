import { auth } from "../firebase";

export class AuthService {
  constructor() {}

  private finduser = (uid: string): boolean => {
    auth
      .getUser(uid)
      .then((user) => true)
      .catch((err) => {
        throw new Error(err);
      });
    return false;
  };

  public isFirebaseUser = (
    token: string,
    callback: (response: { verified: boolean; uid: string }) => void
  ) => {
     auth
        .verifyIdToken(token)
        .then((decodedToken) => {
          auth.getUser(decodedToken.uid).then((user) => {
            callback({ verified: true , uid: user.uid });
          });
        })
        .catch((err) => {
          callback({ verified: false , uid: ''});
        });
  } 
}
