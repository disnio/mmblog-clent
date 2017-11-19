import Axios from 'axios'
import config from '@/../config'

Axios.defaults.baseURL = config.server.baseUrl;
export default {
    createTag(name) {
        return Axios.post('/api/tags', {name: name})
    },
    getAllTags() {
        return Axios.get('/api/tags')
    },
    modifyTag(id, name) {
        return Axios.patch('/api/tags/' + id, name)
    },
    deleteTag(id) {
        return Axios.delete('/api/tags/' + id)
    }
}
