import mongodb from "mongodb";
const objectId = new mongodb.ObjectId();

let reviews;

export default class ReviewsDAO{
    static async injectDB(conn){ /*static para não precisar instanciar ReviewsDAO para chamar a função */
        if(reviews){
            return;
        }
        try{
            reviews = await conn.db("reviews").collection("reviews");
        }catch(e){
            console.error(`Unable to establish collection handles in userDAO: ${e}`);
        }
    }

    static async addReview(movieId, user, review){
        try{
            const reviewDoc = {
                movieId: movieId,
                user: user,
                review: review
            }

            return await reviews.insertOne(reviewDoc); /*comando do mangodb para inserir um arquivo */
        }catch(e){
            console.error(`Unable to post review: ${e}`);
            return { error: e};
        }
    }

    static async getReview(reviewId) {
        try {
          return await reviews.findOne({ _id: new mongodb.ObjectId(reviewId) })
        } catch (e) {
          console.error(`Unable to get review: ${e}`)
          return { error: e }
        }
    }

    static async updateReview(reviewId, user, review){
        try{
            const updateResponse = await reviews.updateOne(
                { _id: new mongodb.ObjectId(reviewId ) },
                { $set: { user: user, review: review }}
            )
            return updateResponse;
        }catch(e){
            console.error(`Unable to update review: ${e}`);
            return { error: e};
        }
    }

    static async deleteReview(reviewId){
        try{
            const deleteResponse = await reviews.deleteOne({ 
                _id: new mongodb.ObjectId(reviewId ),
            })
            return deleteResponse;
        }catch(e){
            console.error(`Unable to delete review: ${e}`);
            return { error: e};
        }
    }

    static async getReviewsByMovieId(movieId){
        try{
            const cursor = await reviews.find({
                movieId: parseInt(movieId)
            });
            return cursor.toArray();
        }catch(e){
            console.error(`Unable to get review: ${e}`);
            return { error: e};
        }
    }
}