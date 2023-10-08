import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Review({ reviewData }) {
    const { review, date_created, user_id, park_id } = reviewData
    const [user, setUser] = useState({})
    const [park, setPark] = useState({})

    useEffect(() => {
        fetch(`/user/${user_id}`)
            .then((r) => r.json())
            .then((data) => setUser(data))

        fetch(`/park/${park_id}`)
            .then((r) => r.json())
            .then((data) => setPark(data))
    }, [user_id, park_id])

    return (
        <>
            {review ?
                (<div className="review_card">
                    <h3>User:
                        <Link to={`/userreviews/${user_id}`}>
                            {user.username}
                        </Link>
                    </h3>
                    <p>{review}</p>
                    <p><b>Date Created:</b> {date_created.slice(0, 10)}</p>
                    <p><em>Park:</em> {park.destination}</p>
                </div>)
                :
                (<div className="review_card">
                    <h2>Not reviewed!</h2>
                </div>)}
        </>
    )
}

export default Review;