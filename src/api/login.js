import Axios from 'axios'
import config from '@/../config'

Axios.defaults.baseURL = config.server.baseUrl;
export default {
    createToken(username, password) {
        return Axios.post('/api/user', {username, password})
    }
}
