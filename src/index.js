import express from "express";
import { connect } from "./config/database.js";
import bodyParser from 'body-parser';

import apiRoutes from './routes/index.js';

import { TweetRepository, UserRepository } from './repository/index.js';
import LikeService from "./services/like-service.js"


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/api', apiRoutes);

app.listen(3000, async () => {
    console.log(`server started`);
    await connect();
    console.log("mongo db connected");

    const userRepo = new UserRepository();
    const tweetRepo = new TweetRepository();
    const tweet = await tweetRepo.getAll(0,10);

    // const user = await userRepo.create({
    //   email: "test@gmail.com",
    //   password: "1234",
    //   name: "d1vyanshu",
    // })

    const likeService = new LikeService();
    likeService.toggleLike(tweet[0].id, 'Tweet', "651051ebbc10a92175baa28d");

});
