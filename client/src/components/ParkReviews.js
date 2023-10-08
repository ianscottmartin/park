import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Review from "./Review";

function ParkReviews({ currentUser, parks }) {
    const [reviews, setReviews] = useState([])
    const [park, setPark] = useState({})
    const { id } = useParams()

    useEffect(() => {
        fetch(`/park_reviews/${id}`)
            .then((r) => r.json())
            .then((reviews) => setReviews(reviews));

        fetch(`/park/${id}`)
            .then((r) => r.json())
            .then((parkData) => setPark(parkData))
    }, [id]);
    if (reviews.length > 0) {

        return (
            <div className="park-card">
                <h1>Destination: {park.destination}</h1>
                <h2>Entry Fee: ${park.entry_fee}</h2>
                <p><b>Description:</b> {park.description}</p>
                <h2>Reviews:</h2>
                {reviews.map((review) => {
                    return <Review
                        key={review.id}
                        reviewData={review}
                        currentUser={currentUser}
                        parks={parks}
                    />
                }
                )}

            </div>
        )
    }
    else {
        return (
            <div className="park-reviews-card">
                <h1>Destination: {park.destination}</h1>
                <h2>Entry Fee: ${park.entry_fee}</h2>
                <p><b>Description:</b> {park.description}</p>
                <h2>No Reviews!</h2>
            </div>
        )
    }

}

export default ParkReviews;