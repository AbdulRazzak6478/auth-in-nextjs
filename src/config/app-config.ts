
import dotenv from 'dotenv';

dotenv.config();

const config = {
    MONGO_URI : process.env.MONGO_URI,
}
console.log('configurations : ',config)
export default config;