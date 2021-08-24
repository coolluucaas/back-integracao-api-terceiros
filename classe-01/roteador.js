const express = require('express')
const { obterInfoEmpresa } = require('./controladores/empresas')
const roteador = express()

roteador.get('/empresas/:dominioEmpresa', obterInfoEmpresa)

module.exports = roteador
