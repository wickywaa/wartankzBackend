export interface user {
    name:string,
    confirmedEmail:string, 
    preferred_username:string,
    location:string,
    rank:string,
    sub:string,
}

export interface IcognitoUser {
    attributes:user
  }
