import { Client } from "pg";
import dotenv from "dotenv";

dotenv.config();

//makes connection to db
export function connect(){
    const db = new Client({
        user : process.env["DB_USER"],
        host : process.env["DB_HOST"],
        database : process.env["DB_NAME"],
        password : process.env["DB_PASSWORD"]?.toString(),
        port : 5432
    })
    db.connect().then((_)=>console.log("connected")).catch((err)=>console.log(err))
    return db;
}


