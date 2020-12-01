import axios from 'axios'
import store from '@/store/index';



const baseURL = {
    'yidong':'https://some-domain.com/api/',
    'liantong':'https://bbbbbb.com/api/',
    'dianxing':'https://bccccccccccccccccb.com/api/',
}

const instance = axios.create({
    baseURL: baseURL[store.state.master.key],
    // headers: {'X-Custom-Header': 'foobar'}
});
console.log(store.state.master);
console.log('storebaseURL',baseURL[store.state.master.key]);

export default instance ;