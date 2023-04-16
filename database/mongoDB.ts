import  { MongoClient, ServerApiVersion } from 'mongodb';

const uri =  (process.env.RUNMODE === "DEV" ?  process.env.MONGO_DB_DEV_URI : process.env.MONGO_DB_LIVE_URI) ?? '';

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
} )
client.connect()

console.log(uri)

export const   db =  client.db('rawbotzadmindev');
console.log(db)
export const collection =  db.collection('rawbotzdev')
client.connect();


async function run() {
    try {
      const database = await client.db('rawbotzadmindev');
      const movies = await database.collection('rawbotzdev');
      // Query for a movie that has the title 'Back to the Future'
      movies.insertOne({
        name:'gav',
        age:35
    }).then((response)=>{
    
        console.log(response)
    })
      // Ensures that the client will close when you finish/error
      
    }catch(e){
      console.log('adgf')
    }
  }
  run().catch(console.dir);

