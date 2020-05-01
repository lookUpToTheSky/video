import axios from "axios";
import {Toast} from "mint-ui";
axios.defaults.baseURL = 'http://www.limingfeng.com'; 
function get(url, params) {
    return new Promise((resolve, reject) => {
        axios.get(url, {params})
        .then( res=> {
            if(res.data.code == 200) {
                resolve(res.data); 
            }else if(res.data.code == 402) {
                Toast({
                    message: '服务器断开',
                    position: 'middle',
                    duration: 2000
                });
                resolve([]);
            }
        })
        .catch(err => {
            reject(err);
        })
        
    })
}

function post(url, pramas) {
    return new Promise((resolve, reject) => {
        axios.get(url,{data: pramas})
        .then( res=> {
            console.log(res);
            resolve(res.data);
        })
        .catch(err => {
            reject(err);
        })
    })
}
export {get, post};