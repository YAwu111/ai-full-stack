import { useState } from "react"
function Square(){
    return (
        <button onClick={ChangeSquare} className="square">
            
        </button>
    )
}
export default function Board(){
    return (
        <>
            <div>
                <Square />
                <Square />
                <Square />
            </div>
            <div>
                <Square />
                <Square />
                <Square />
            </div>
            <div>
                <Square />
                <Square />
                <Square />
            </div>
        </>
    )
}