import React from "react";
import Park from "./Park"


function ParkList({ parks }) {

    return (
        <div id="park-list">
            <h1>Park List</h1>
            <ul>
                {parks.map((park) => {
                    return <Park
                        key={park.id}
                        park={park}
                    />
                })}
            </ul>
        </div>
    )
}
export default ParkList;