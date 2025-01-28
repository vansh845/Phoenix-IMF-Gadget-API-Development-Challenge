import express from 'express';
import { client } from './db';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    client.connect().then((_)=>res.send("yes")).catch((err)=>console.log(err))
})

app.get('/gadgets', (req, res) => {
    res.send("Hello world")
})

app.post('/gadgets',(req,res)=>{
     
})

app.listen(port, () => {
    console.log(`Server is running at 🚀 http://localhost:${port}`)
})
