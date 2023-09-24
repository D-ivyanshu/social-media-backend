import Like from '../models/like.model.js';
import CrudRepository from './crud-repository.js';

class LikeRepository extends CrudRepository {

    constructor() {
        super(Like);
    }

    async findByUserAndLikeable(data) {
        try {
            const response = Like.findOne(data);
            return response;
        } catch (error) {
            throw error; 
        }
    }

}

export default LikeRepository;