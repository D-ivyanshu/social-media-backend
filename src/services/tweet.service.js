import { TweetRepository, HashtagRepository } from '../repository/index.js'

class TweetService {
    constructor() {
        this.tweetRepository = new TweetRepository();
        this.hashtagRepository = new HashtagRepository();
    }

    async create(data) {
        const content = data.content;
        let tags = content.match(/#[a-zA-Z0-9_]+/g)
                        .map((tag) => tag.substr(1).toLowerCase());
                        
        const tweet = await this.tweetRepository.create(data);
        let alreadyPresentTags = await this.hashtagRepository.getByName(tags);
        let titleOfPresentTags = alreadyPresentTags.map((tag) => tag.title);
        let newTags = tags.filter((tag) => !titleOfPresentTags.includes(tag));    
        newTags = newTags.map(tag => {
            return {
                title: tag,
                tweets: [tweet.id]
            }
        });

        const response = await this.hashtagRepository.bulkCreate(newTags);
        alreadyPresentTags.forEach((tag) => {
            tag.tweets.push(tweet.id);
            tag.save();
        });
        
        return tweet;
    }

    async get(tweetId) {
        console.log("here");
        const tweet = await this.tweetRepository.getWithComments(tweetId);
        return tweet;
    }
}

export default TweetService;