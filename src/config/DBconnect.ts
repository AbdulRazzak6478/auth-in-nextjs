import mongoose from 'mongoose';
import config from './app-config';

export async function DBconnect(){
    try {
        console.log('Connecting to Mongo DB , Please wait .....');

        const result = await mongoose.connect(config.MONGO_URI!);

        const connection = mongoose.connection;
        connection.on('connected',()=>{
            console.log('MongoDB connected');
        });
        connection.on('error',(err)=>{
            console.log('MongoDB connection error, Please make sure DB is up and running'+err);
            process.exit();
        });
    } catch (error) {
        console.log('error in connecting to database ,Please check the connection ...'+error);
    }
}

