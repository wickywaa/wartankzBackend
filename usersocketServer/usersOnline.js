 
class user {

    constructor(name, Id,callsign,socketId) {
        this.name = name;
        this.Id = Id;
        this.callsign =callsign
        this.socketId = socketId
      }
    

}

const users = []


 const addUser = (userToAdd)=>{

    const {name,Id,callsign,socketId}=userToAdd

        const user  =  new user(name,Id,callsign,socketId)
        users.append(user)


 }

 module.exports = addUser
 
 