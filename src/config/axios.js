import axios from 'axios'
import store from '@/store/index';



const baseURL = {
    'yidong':'http://172.17.103.105:12223/',
    'liantong':'https://bbbbbb.com/api/',
    'dianxing':'https://bccccccccccccccccb.com/api/',
}

const instance = axios.create({
    baseURL: baseURL[store.state.master.key],
    // headers: {'X-Custom-Header': 'foobar'}
});


export default instance ;