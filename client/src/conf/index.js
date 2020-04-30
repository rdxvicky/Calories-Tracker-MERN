import DEV_CONF from './dev';
import PROD_CONF from './prod';

export const get = (key) => {
    const ENV = process.env.NODE_ENV;
    
    switch(ENV) {
        case 'prod': {
            return PROD_CONF[key];
        }
        default: {
            return DEV_CONF[key];
        }
    }
};