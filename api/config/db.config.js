const mongoose = require('mongoose');
const logger = require('../logger/api.logger');

const connect = () => {

    const url = 'mongodb+srv://mean-stack-user:tTzCq8BCdMsjcV9@mean-stack.pgjjn1m.mongodb.net/test?retryWrites=true&w=majority';//process.env.MONGO_CONNECTION_STRING;
    logger.info("process.env.MONGO_CONNECTION_STRING :::" + process.env.MONGO_CONNECTION_STRING);

    mongoose.connect(url, {
        useNewUrlParser: true,
        useFindAndModify: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    })

    mongoose.connection.once("open", async () => {
        logger.info("Connected to database");
    });
      
    mongoose.connection.on("error", (err) => {
        logger.error("Error connecting to database  ", err);
    });
}

const disconnect = () => {
    
    if (!mongoose.connection) {
      return;
    }
    
    mongoose.disconnect();

    mongoose.once("close", async () => {
        console.log("Diconnected  to database");
    });

};

module.exports = {
    connect,
    disconnect
}