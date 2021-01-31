const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const {ApolloServer} = require('apollo-server-express');
const schema = require('../db/schema');
const excelRouter = require('./routes/excelRouter');
require("dotenv").config({path: "variables.env"});

const app = express();
// Connect MONGDP
const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.DB_MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
        });
        console.log("DB Connected");
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};
connectDB();

//SETTINGS
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(cors());
//ROUTES
app.use('/api', excelRouter)

//GRAPHQL
const server = new ApolloServer({
    schema,
    context: ({req}) => {
      const token = req.headers["authorization"] || "";
      if (token) {
        try {
          const usuario = jwt.verify(token, process.env.SECRETA);
          return { usuario };
        } catch (error) {
          throw new Error(error.message);
        }
      }
    },
  });
  server.applyMiddleware({app})

// START SERVER
app.set('port', process.env.APP_PORT)
app.listen(app.get('port'), () => {
    console.log(`Server runing on port: ${process.env.APP_PORT} ${server.graphqlPath}`)
});