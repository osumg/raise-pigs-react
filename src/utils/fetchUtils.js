import {message} from 'antd';


//延迟
const fetchDelay = (timeout = 15 * 1000) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject(new Error('网络超时或请求失败！'));
        }, timeout);
    })
};

//post请求
const postData = (url, data) => new Promise((resolve, reject) => {
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(result => resolve(result))
        .catch(error => reject(error))
})

//封装post请求和延迟
const fetchPost = (url, data, successfulCallback, timeout) => {
    Promise.race([fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }), fetchDelay(timeout)]).then(res => res.json()).then(res => {
        if (res.code === 0) {
            successfulCallback(res.data);
        } else {
            message.error({
                content: res.msg,
                duration: 2,
                style: {
                    marginTop: '30vh',
                },
            });
        }
    }).catch((error) => {
        console.log("promise:", error);
    });
};

const fetchGet = (url, successfulCallback, timeout) => {
    Promise.race([fetch(url), fetchDelay(timeout)]).then(res => res.json())
        .then(res => {
            if (res.code === 0) {
                successfulCallback(res.data);
            } else {
                message.error({
                    content: res.msg,
                    duration: 2,
                    style: {
                        marginTop: '30vh',
                    },
                });
            }
        })
        .catch(error => {
            console.log("promise:", error);
        })
}

export {fetchPost, fetchGet};
