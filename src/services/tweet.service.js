import { TweetRepository, HashtagRepository } from '../repository/index.js'

class TweetService {
    constructor() {
        this.TweetRepository = new TweetRepository();
        this.HashtagRepository = new HashtagRepository();
    }

    async create(data) {
        console.log(data);
        const content = data.content;
        let tags = content.match(/#[a-zA-Z0-9_]+/g)
                        .map((tag) => tag.substr(1).toLowerCase());
                        
        const tweet = await this.TweetRepository.create(data);
        let alreadyPresentTags = await this.HashtagRepository.getByName(tags);
        let titleOfPresentTags = alreadyPresentTags.map((tag) => tag.title);
        let newTags = tags.filter((tag) => !titleOfPresentTags.includes(tag));    
        console.log(newTags);    
        newTags = newTags.map(tag => {
            return {
                title: tag,
                tweets: [tweet.id]
            }
        });

        const response = await this.HashtagRepository.bulkCreate(newTags);
        alreadyPresentTags.forEach((tag) => {
            tag.tweets.push(tweet.id);
            tag.save();
        });
        
        
        return tweet;
    }
}

export default TweetService;