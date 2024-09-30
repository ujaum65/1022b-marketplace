console.log("J7");

//VAMOS ULTILIZAR O EXPRESS
import express from 'express'
import mysql2 from 'mysql2/promise'
import cors from 'cors'

//CRIAR UM OBJ DA APLICAÇÃO
const app = express()

//receber json
app.use(express.json())

//incluir CORS
app.use(cors())

//rotas de produtos
app.get("/produtos",async(req,res)=>{

//ROTAS
try{
const conexao = await mysql2.createConnection({
    host: process.env.dbhost?process.env.dbhost:"localhost",
    database: process.env.dbname?process.env.dbname: "banco1022b",
    user: process.env.dbuser?process.env.dbuser:"root",
    password: process.env.dbpassword?process.env.dbpassword:"",
    port: process.env.dbport?parseInt(process.env.dbport):3306
})
//query -> select 
const [result,fields] = await conexao.query("SELECT * from prosutos")

//dados do banco
res.send(result)
}catch(e){
    res.status(500).send("erro do servidor")
}
})
//INICIAR O SERVIDOR
app.listen(8000,()=>{
    console.log("SERVIDOR INICIADO NA PORTA 8000")
})
