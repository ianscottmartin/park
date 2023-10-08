import React, { useState, useEffect } from "react";
import Review from "./Review";
import { useHistory } from "react-router-dom";

function UserPage({ currentUser, parks, setAppUser }) {
    const [reviews, setReviews] = useState([])
    const [showUserEdit, setShowUserEdit] = useState('none')
    const [user, setUser] = useState(currentUser)
    const [alias, setAlias] = useState(currentUser.alias)
    // const [imageUrl, setImageUrl] = useState(currentUser.image_url)
    const [form, setForm] = useState({
        alias: user.alias,

    })
    const history = useHistory()

    useEffect(() => {
        fetch(`/${user.id}/reviews`)
            .then((r) => r.json())
            .then((reviews) => setReviews(reviews))

    }, [])

    function handleChange(e) {
        const { name, value } = e.target

        setForm({
            ...form,
            [name]: value
        })
    }

    function handleSubmit(e) {
        e.preventDefault()
        const userInfo = {
            alias: form.alias,

        }
        fetch(`/user/${user.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userInfo)
        })
            .then((r) => r.json())
            .then((data) => {
                setUser(data)
                setAlias(data.alias)
            })

        setForm({
            alias: user.alias,

        })
        setShowUserEdit('none')
    }

    function handleDeleteClick() {
        fetch(`/user/${user.id}`, {
            method: "DELETE"
        })
            .then(() => alert('User successfully deleted.'))

        fetch('/logout', { method: "DELETE" })
            .then((r) => {
                if (r.ok) {
                    setAppUser(null)
                }
            })
            .then(() => history.push('/'))
    }

    function handleCloseForm() {
        setForm({
            alias: user.alias,

        });
        setShowUserEdit('none');
    }

    return (
        <div className="user-card">
            <h1>{user.username}</h1>
            <p><b>Alias:</b> {alias}</p>
            <button onClick={() => setShowUserEdit('block')}>Edit User Info</button>
            <button onClick={handleDeleteClick}>Delete User</button>
            <form onSubmit={handleSubmit} style={{ display: showUserEdit }}>
                <h4>New Alias:</h4>
                <input
                    type="text"
                    name="alias"
                    id="alias"
                    autoComplete="off"
                    value={form.alias}
                    onChange={handleChange}
                />
                <h4>New Image:</h4>
                <input
                    type="text"
                    name="image_url"
                    id="image_url"
                    autoComplete="off"
                    value={form.image_url}
                    onChange={handleChange}
                />
                <button type="submit">Update User</button>
                <button onClick={handleCloseForm}>Close</button>
            </form>
            <h2>Reviews:</h2>
            {reviews.map((review) => {
                return (
                    <Review
                        key={review.id}
                        reviewData={review}
                        currentUser={user}
                        parks={parks}
                    />
                )
            })}
        </div>
    )
}

export default UserPage;