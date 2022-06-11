import express from "express";
import { graphqlHTTP } from 'express-graphql';
import  schema from './schema.js';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';


dotenv.config();

const app = express();


app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

const __dirname = path.resolve();

if (process.env.NODE_ENV === 'production') {
    
    app.use(express.static(path.join(__dirname, '/client/build')))

    app.get('*', (req, res) => 
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    )
}else{

    app.get('/', (req, res) => {
        res.send('API is running...')
    })
}

const PORT = process.env.PORT || 5000

app.listen(PORT, 
    console.log(`Graphql server running on ${process.env.NODE_ENV} mode port ${process.env.PORT}`)
)