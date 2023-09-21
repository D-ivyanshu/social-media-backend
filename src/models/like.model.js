import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
    onModel: {
        type: String,
        required: true,
        enum: ['Tweet', 'Comment']
    },
    likeable: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'onModel' // can study about this pattern from here :  https://mongoosejs.com/docs/populate.html#:~:text=Mongoose%20can%20also%20populate%20from%20multiple%20collections%20based%20on%20the%20value%20of%20a%20property%20in%20the%20document.%20Let%27s%20say%20you%27re%20building%20a%20schema%20for%20storing%20comments.%20A%20user%20may%20comment%20on%20either%20a%20blog%20post%20or%20a%20product.
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {timestamps: true});

const Like = mongoose.model('Like', likeSchema);
export default Like;