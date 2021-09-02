const axios = require('axios')

const instanciaAxios = axios.create({
    baseURL: 'https://ipgeolocation.abstractapi.com/v1/',
    params: {
        api_key : '9b21541f677c4baeb53e0bec2bc13c05'
    }
})

module.exports = {
    instanciaAxios
}


