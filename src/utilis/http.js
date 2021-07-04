import axios from 'axios'

const get = ({ url, params }) => {
    return axios({
        url,
        params
    })
        .then(result => {
            //这里还要返回数据给前端
            return result.data.data
        })
        .catch(e => {

            return e
        })
}

export {
    get
}