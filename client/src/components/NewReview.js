import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function NewReview({ user, parks }) {
    const [form, setForm] = useState({
        review: '',
        park_id: 1
    })
    const history = useHistory()

    function handleChange(e) {
        const { name, value } = e.target

        setForm({
            ...form,
            [name]: value
        })
    }

    function handleSubmit(e) {
        e.preventDefault()
        const reviewInfo = {
            review: form.review,
            park_id: form.park_id
        }

        fetch(`/${user.id}/reviews`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(reviewInfo)
        })
            .then((r) => {
                if (r.ok) {
                    r.json().then(() => history.push(`/userreviews/${user.id}`))
                }
            })
        console.log(reviewInfo)
        setForm({
            review: '',
            park_id: ''
        })
    }

    return (
        <div className="new-review">
            <h1>Add a new Park review!</h1>
            <form onSubmit={handleSubmit}>
                <h4>Review:</h4>
                <input
                    type="text"
                    size='50'
                    placeholder="Review..."
                    name="review"
                    id="review"
                    autoComplete="off"
                    value={form.review}
                    onChange={handleChange}
                />
                <h4>Park ID:</h4>
                <select id='park_id' name='park_id' onChange={handleChange} value={form.park_id}>
                    {parks.map((park) => {
                        return <option value={park.id} key={park.id}>{park.id}</option>
                    })}
                </select>
                <br></br>
                <button type="submit">Add review</button>
            </form>
        </div>
    )
}

export default NewReview;