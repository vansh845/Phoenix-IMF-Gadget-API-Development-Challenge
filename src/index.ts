import express from 'express';
import { client } from './db';
import {generatePercentage,generateUUID} from './utils/utils'

const app = express();
app.use(express.json())
const port = 3000;

enum status{
    "Available",
    "Deployed",
    "Destroyed",
    "Decommissioned"
}

client.connect().then((_)=>console.log("connected")).catch((err)=>console.log(err))

const gadget = app.route("/gadgets")

app.get('/gadgets',async (req,res)=>{

    try{
        const status = req.query['status'];
        let q = "SELECT * FROM gadgets";

        const fields = [];
        if(status){
            q = q.concat(" WHERE status=$1")     
            fields.push(status);
        }
        const result = await client.query(q,fields);
        
        res.send(result.rows);
    }catch(err){
        res.send(err)
    }
})

app.post('/gadgets',async (req,res)=>{
    try{
        const name = req.body['name'];
        const codename = req.body['codename']
        const q = "INSERT INTO gadgets(id,name,codename,status,mission_success_probability) VALUES($1,$2,$3,$4,$5) RETURNING *";
        const response = await client.query(q,[generateUUID(),name,codename,'processing',generatePercentage()]);
        res.send(response.rows[0]);
    }catch(err){
        res.send(err);
    }
})

app.patch('/gadgets',async (req,res)=>{
    try{
        const id = req.body['id'];
        const name = req.body['name'];
        const status = req.body['status'];

        let query = "UPDATE gadgets SET ";
        const fields = []; 
        const values = [];
        
        if(name){
            fields.push("name=$1");
            values.push(name);
        }
        if(status){
            fields.push("status=$2");
            values.push(status);
        }

        query = query.concat(fields.join(','));
        query = query.concat(" WHERE id=$3");
        values.push(id);

        client.query(query,values);
        res.send("success");

    }catch(err){
        res.send(err);
    }

})

app.delete('/gadgets',async (req,res)=>{
    try{
        await client.query("BEGIN");

        const id = req.body['id'];
        let q = "UPDATE gadgets SET status=$1 WHERE id=$2";   
        await client.query(q,['decommissioned',id]);
        q = "INSERT INTO decommissioned(gadget_id) VALUES($1);";
        await client.query(q,[id]);
        res.send(JSON.stringify({"status":"done"}))
        await client.query("COMMIT");
    }catch(err){
        res.send(err);
    }
})

app.post('/gadgets/:id/self-destruct',async (req,res)=>{
    try{
        const {id} = req.params;
        res.send(`${100000+Math.floor(Math.random()*900000)}`)
    }catch(err){
        res.send(err);
    }
})

app.listen(port, () => {
    console.log(`Server is running at 🚀 http://localhost:${port}`)
})

