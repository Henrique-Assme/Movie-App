import ReviewsDAO from '../dao/reviewsDAO.js';

export default class ReviewsController {
    static async apiPostReview(request, response, next){
        try{
            const movieId = parseInt(request.body.movieId);
            const review = request.body.review;
            const user = request.body.user;

            const reviewResponse = await ReviewsDAO.addReview(
                movieId,
                user,
                review
            );
            response.json({ status: "success"});
        }catch(e){
            response.status(500).json({ error: e.message });
        }
    }

    static async apiGetReview(request, response, next){
        try{
            let id = request.params.id || {};
            let review = await ReviewsDAO.getReview(id);
            console.log(review);
            if(!review){
                response.status(404).json({ error: "Not found"});
                return;
            }
            response.json(review);
        }catch(e){
            console.log(`api, ${e}`);
            response.status(500).json({ error: e});
        }
    }

    static async apiUpdateReview(request, response, next){
        try{
            const reviewId = request.params.id;
            const review = request.body.review;
            const user = request.body.user;

            const reviewResponse = await ReviewsDAO.updateReview(
                reviewId,
                user,
                review
            );

            var { error } = reviewResponse;
            if(error){
                response.status(400).json({ error });
            }

            if(reviewResponse.modifiedCount === 0){
                throw new Error(
                    "unable to update review",
                );
            }

            response.json({ status: "success" });
        }catch(e){
            response.status(500).json({ error: e.message });
        }
    }

    static async apiDeleteReview(request, response, next){
        try{
            const reviewId = request.params.id;
            const reviewResponse = await ReviewsDAO.deleteReview(reviewId);

            response.json({ status: "success" });
        }catch(e){
            response.status(500).json({ error: e.message });
        }
    }

    static async apiGetReviews(request, response, next){
        try{
            let id = request.params.id || {};
            let reviews = await ReviewsDAO.getReviewsByMovieId(id);
            if(!reviews){
                response.status(404).json({ error: "Not found"});
                return;
            }
            response.json(reviews);
        }catch(e){
            console.log(`api, ${e}`);
            response.status(500).json({ error: e});
        }
    }
}