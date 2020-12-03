import axios from 'axios'
import store from '@/store/index';


//  http://172.17.103.105:12223/

const baseURL = {
    'yidong':'/api',
    'liantong':'/api',
    'dianxing':'/api',
}

const instance = axios.create({
    baseURL: baseURL[store.state.master.key],
    // headers: {'X-Custom-Header': 'foobar'}
});


export default instance ;