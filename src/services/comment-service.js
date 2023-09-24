import { TweetRepository, CommentRepository } from "../repository/index.js";

class CommentService {
    constructor() {
        this.commentRepository = new CommentRepository();
        this.tweetRepository = new TweetRepository();
    }

    async createComments(modelId, modelType, userId, content) {
        if(modelType === "Tweet") {
            var commentable = await this.tweetRepository.get(modelId);
        }
        else if(modelType === 'Comment') {
            var commentable = await this.commentRepository.get(modelId);
        }
        else {
            throw new Error('Unknown Model Type');
        }
        const newComment = await this.commentRepository.create({
            content: content,
            userId: userId,
            onModel: modelType,
            commentable: modelId,
            comments: []
        });
        
        console.log(commentable);
        commentable.comments.push(newComment);
        console.log(commentable);
        await commentable.save();

        return newComment;
    }
}

export default CommentService;