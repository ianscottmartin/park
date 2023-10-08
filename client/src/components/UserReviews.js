import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Review from "./Review";

function UserReviews() {
    const [reviews, setReviews] = useState([])
    const [user, setUser] = useState({})
    const { id } = useParams()

    useEffect(() => {
        fetch(`/${id}/reviews`)
            .then((r) => r.json())
            .then((reviews) => setReviews(reviews));

        fetch(`/user/${id}`)
            .then((r) => r.json())
            .then((userData) => setUser(userData))
    }, [id])

    return (
        <div className="user-reviews-card">
            <h1>User: {user.username}</h1>
            <h2>Reviews:</h2>
            {reviews.map((review) => {
                return <Review
                    key={review.id}
                    reviewData={review}
                />
            }
            )}
        </div>
    )
}

export default UserReviews;