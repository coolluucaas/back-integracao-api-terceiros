const { instanciaAxios } = require('../servicos/company_enrichment')
const fs = require('fs').promises

const caminhoRelativoJSON = 'data/votos.json' //Caminho do arquivo com os dados da votação  relativo a pasta de inicialização da aplicação (lugar do packge.json)
const votoObj = {}

const realizarVoto = async (req, res) => {
    const { pais, ip } = req.params
    const { voto } = req.body

    try {
        const pedido = await instanciaAxios.get('/', {
            params: {
                ip_address: ip,
            },
        })

        if (pedido.status === 204) {
            res.status(400).json({
                message: `O IP, ${ip}, informado não é vállido`,
            })
        }
        if (pedido.data.country === pais) {
            votoObj.ip = ip
            votoObj.voto = voto

            const votoRegistrado = await registrarVoto(votoObj)

            if (votoRegistrado) {
                res.status(200).json(
                    'O voto foi registrado com sucesso'
                )
            } else {
                res.status(400).json(
                    'O voto já cadastrado'
                )            }
        } else {
            return res
                .status(400)
                .json('O IP informado não pertence ao país da votação.')
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

const registrarVoto = async (votoObj, res) => {
    try {
        const registroVotosBuffer = await fs.readFile(caminhoRelativoJSON)
        const registroVotosJSON = JSON.parse(registroVotosBuffer)

        if (registroVotosJSON.find((voto) => voto.ip === votoObj.ip)) {
            return false
        }
            registroVotosJSON.push(votoObj)
        const registroVotosString = JSON.stringify(registroVotosJSON)
        await fs.writeFile(caminhoRelativoJSON, registroVotosString)        
        return true
    } catch (error) {       
         throw error
    }
}

module.exports = {
    realizarVoto,
}
