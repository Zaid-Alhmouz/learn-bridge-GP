package com.learnbridge.learn_bridge_back_end.dao;

import com.learnbridge.learn_bridge_back_end.entity.Rating;

import java.util.List;

public interface RatingDAO {

    void saveRating(Rating rating);
    void updateRating(Rating rating);
    void deleteRating(Long ratingId);
    List<Rating> findAllRatings();
    Rating findRatingBySessionId(Long sessionId); // To be revised
    List<Rating> findRatingsByInstructorId(Long instructorId);
    void deleteRatingByUserId(Long sessionId);

}
