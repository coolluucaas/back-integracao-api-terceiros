const  axios = require('axios')

const instanciaAxios = axios.create({
    baseURL: 'https://companyenrichment.abstractapi.com/v1/',
    params:{
        api_key:'db9d095e2fa0465ebec06941faa9ece7'        
    }
})

module.exports = instanciaAxios
