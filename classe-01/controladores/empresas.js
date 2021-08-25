const instanciaAxios = require('../servicos/company_enrichment')
const fs = require('fs').promises

const caminhoRelativoJSON = 'data/empresas.JSON' //Caminho do arquivo de dados das empresas relativo a pasta de inicialização da aplicação

const obterInfoEmpresa = async (req, res) => {
    const { dominioEmpresa } = req.params

    const listaDeEmpresasBuffer = await fs.readFile(caminhoRelativoJSON)
    const listaDeEmpresasJSON = JSON.parse(listaDeEmpresasBuffer)
    let mensagem= ''

    const arrayNomesEmpresas = listaDeEmpresasJSON.map(item => item.name)

    try {
        const { data } = await instanciaAxios.get('', {
            params: {
                domain: dominioEmpresa,
            },
        })        

        if(data.name && !arrayNomesEmpresas.includes(data.name)){
            listaDeEmpresasJSON.push(data)
            const listaDeEmpresasString = JSON.stringify(listaDeEmpresasJSON)            
            await fs.writeFile(caminhoRelativoJSON, listaDeEmpresasString)
            return res.json({ mensagem : 'As informações da empresa consultada foram incluídas no banco de dados.',
            data})

        } else if (arrayNomesEmpresas.includes(data.name)){
            return res.json({ mensagem : 'A empresa já está cadastrada no banco de dados.',
            data})
        } else {
            return res.json({ data })
        }

    } catch (error) {
        return res.json(error.message)
    }
}

module.exports = {
    obterInfoEmpresa
}
