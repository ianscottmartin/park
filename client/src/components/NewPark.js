import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function NewPark() {
    const [form, setForm] = useState({
        destination: '',
        entry_fee: '',
        description: '',
        park_image_url: '',
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
        e.preventDefault();
        const parkInfo = {
            destination: form.destination,
            entry_fee: form.entry_fee,
            description: form.description,

        }

        fetch('/parks_index', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(parkInfo)
        })
            .then((r) => {
                if (r.ok) {
                    r.json().then((park) => {
                        console.log(park)
                        history.push(`/parkreviews/${park.id}`)
                    })
                }
                else {
                    r.json().then((error) => alert(error.message))
                }
            })
        setForm({
            destination: '',
            entry_fee: '',
            description: '',

        })
    }

    return (
        <div className="new-park">
            <h1>Add a new park to the list!</h1>
            <form onSubmit={handleSubmit}>
                <h4>Destination:</h4>
                <input
                    type="text"
                    placeholder="Destination..."
                    name="destination"
                    id="destination"
                    autoComplete="off"
                    value={form.destination}
                    onChange={handleChange}
                />
                <h4>Entry Fee:</h4>
                <input
                    type="number"
                    placeholder="AEntry Fee..."
                    name="entry_fee"
                    id="entry_fee"
                    autoComplete="off"
                    value={form.entry_fee}
                    onChange={handleChange}
                />
                <h4>Description:</h4>
                <input
                    type="text"
                    placeholder="Description..."
                    name="description"
                    id="description"
                    autoComplete="off"
                    value={form.description}
                    onChange={handleChange}
                />
                <h4>Image:</h4>
                <input
                    type="text"
                    placeholder="Image URL..."
                    name="park_image_url"
                    id="park_image_url"
                    autoComplete="off"
                    value={form.park_image_url}
                    onChange={handleChange}
                />
                <br></br>
                <button type="submit">Add park</button>
            </form>
        </div>
    )
}

export default NewPark;