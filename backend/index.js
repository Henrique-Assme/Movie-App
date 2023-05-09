import app from "./server.js";
import mongodb from "mongodb";
import ReviewsDAO from "./dao/reviewsDAO.js";
/*DAO = data acces object */

const MongoClient = mongodb.MongoClient;
const mongo_username = process.env['MONGO_USERNAME'];
const mongo_password = process.env['MONGO_PASSWORD'];
const uri = `mongodb+srv://heniassme:haa140403@cluster0.h82x2px.mongodb.net/?retryWrites=true&w=majority`

const port = 8000; /*localhost:8000*/

MongoClient.connect(
    uri,
    {
        //maxPollSize: 50, /*max user that can access at the same time */
        wtimeoutMS: 2500, /*max time for try to connect before timeout */
        useNewUrlParser: true, 
    }
).catch(err => {
    console.error(err.stack);
    process.exit(1);
}).then(async client => {
    await ReviewsDAO.injectDB(client); /*consegue acessar a db */
    app.listen(port, () => {/*listen é para começar o site */
        console.log(`listening on port ${port}`);
    });
});

