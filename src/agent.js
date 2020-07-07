import axios from 'axios';

axios.defaults.baseURL = 'https://conduit.productionready.io';

const response = res => res.data;

const Articles = {
    all: async(page=1, size=10) => await axios.get(`/api/articles?limit=${size}&offset=${(page-1)*size}`).then(response),
    byTag: async(tag, page=1, size=10) => axios.get(`/api/articles?limit=${size}&offset=${(page-1)*size}&tag=${tag}`).then(response),
}

const Tags = {
    all: async() => await axios.get(`/api/tags`).then(response)
}

export default {
    Articles,
    Tags
}