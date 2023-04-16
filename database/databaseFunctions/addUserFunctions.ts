import {db, collection} from  '..'


export const addUser = async() => {

    try {
        collection.insertOne({
            name:'gav',
            age:35
        }).then((response)=>{
        
            console.log(response)
        })
    }catch (e){
        console.log(e)
    }
}