import { Client } from "pg";
import dotenv from "dotenv";

dotenv.config();

export const db = new Client({
    user : process.env["DB_USER"],
    host : process.env["DB_HOST"],
    database : process.env["DB_NAME"],
    password : process.env["DB_PASSWORD"]?.toString(),
    port : 5432
})



export async function putGadget(conn : Client) {
    const q = "INSERT INTO gadgets VALUES($1,$2,$3) RETURNING *";
    const res = await conn.query(q,[1,'vansh','processing']);
    return res;
}

