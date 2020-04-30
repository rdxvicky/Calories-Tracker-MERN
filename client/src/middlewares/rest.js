import axios from 'axios';

export const get = (endpoint, headers) => (
    axios({
        method: 'get',
        headers: {
            ...headers,
            'content-type': 'application/json',
        },
        url: endpoint,
    })
    .then(({data}) => data && data.body)
    .catch(err => {
        if( 
            err &&
            err.response &&
            err.response.status &&
            (err.response.status === 401)
        ) setTimeout(() => {
            window.location.assign('/');
        }, 3000);
        throw   err &&
                err.response &&
                err.response.data &&
                err.response.data.message;
    })
);

export const post = (endpoint, data = {},  headers) => (
    axios({
        method: 'post',
        headers: {
            ...headers,
            'content-type': 'application/json',
        },
        url: endpoint,
        data,
    })
    .then(({data}) => data && data.body)
    .catch(err => {
        if( 
            err &&
            err.response &&
            err.response.status &&
            (err.response.status === 401)
        ) setTimeout(() => {
            window.location.assign('/');
        }, 3000);
        throw   err &&
                err.response &&
                err.response.data &&
                err.response.data.message;
    })
);

export const put = (endpoint, data = {}, headers) => (
    axios({
        method: 'put',
        headers: {
            ...headers,
            'content-type': 'application/json',
        },
        url: endpoint,
        data,
    })
    .then(({data}) => data && data.body)
    .catch(err => {
        if( 
            err &&
            err.response &&
            err.response.status &&
            (err.response.status === 401)
        ) setTimeout(() => {
            window.location.assign('/');
        }, 3000);
        throw   err &&
                err.response &&
                err.response.data &&
                err.response.data.message;
    })
);

export const remove = (endpoint, data = {}, headers) => (
    axios({
        method: 'delete',
        headers: {
            ...headers,
            'content-type': 'application/json',
        },
        url: endpoint,
        data,
    })
    .then(({data}) => data && data.body)
    .catch(err => {
        if( 
            err &&
            err.response &&
            err.response.status &&
            (err.response.status === 401)
        ) setTimeout(() => {
            window.location.assign('/');
        }, 3000);
        throw   err &&
                err.response &&
                err.response.data &&
                err.response.data.message;
    })
);
