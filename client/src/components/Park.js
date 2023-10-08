import React from "react"
import { Link } from "react-router-dom"

function Park({ park }) {
    const { id, destination, entry_fee, description } = park


    return (
        <div className="park-card">
            <h1>{destination}</h1>
            <h2>${entry_fee}</h2>
            <p><b>Description:</b> {description}</p>
            <Link to={`/parkreviews/${id}`}>
                <button>Continue</button>
            </Link>
        </div>
    )
}

export default Park;