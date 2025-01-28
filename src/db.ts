import { Client } from "pg";
import dotenv from "dotenv";

dotenv.config();

export const client = new Client({
    user : process.env["DB_USER"],
    host : process.env["DB_HOST"],
    database : process.env["DB_NAME"],
    password : process.env["DB_PASSWORD"]?.toString(),
    port : 5432
})


