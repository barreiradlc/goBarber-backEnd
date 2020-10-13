import express from 'express'
import routes from "./routes"

import "./database";

const app = express();

app.use(express.json());
app.use(routes);

app.get(`/`, (request, response) => {
    return response.json({ message: `Olar` })
})

app.listen(3333, () => {
    console.log(`Servidor ouvindo na porta 3333`)
})