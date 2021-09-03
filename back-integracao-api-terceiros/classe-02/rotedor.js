const express = require('express')
const { realizarVoto } = require('./controladores/votos')
const roteador = express()

roteador.post('/votacao/:pais/:ip', realizarVoto)

module.exports = {
    roteador
}