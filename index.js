//Iniciando Server
const express = require('express')
const app = express()

//Importar Modulos
const { insertar, consultar, editar } = require('./db')

app.listen(3000, () => {
    console.log("App escuchando puerto 3000")
})

// Middleware
app.use(express.json())

//Ruta inicial
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

//Ruta para modificaciones (Consulta Post para insertar)
app.post("/post", async (req, res) => {
    // Obtenemos información del formulario
    const payload = req.body

    //Conección con modulo DB para Aplicar consulta Insertar
    try {
        const response = await insertar(payload)

        res.send(response.rows)
    } catch (error) {
        // Definimos código de estado
        res.statusCode = 500
        res.json({ error: 'Algo salió mal, intentalo más tarde' })
    }
})

//Consulta Get para Obtener valores
app.get("/posts", async (req, res) => {
    try {
        const response = await consultar()

        res.send(response.rows)
    } catch (error) {
        // Definimos código de estado
        res.statusCode = 500
        res.json({ error: 'Algo salió mal, intentalo más tarde' })
    }
})

//Consulta Put para actualizar registros y like
app.put("/post", async (req, res) => {
    const id = req.query;

    try {
        const response = await editar(id);
        res.send(response.rows);
    } catch (error) {
        res.statusCode = 500
        res.json({ error: 'No fue posible dar like al post.' })
    }
})