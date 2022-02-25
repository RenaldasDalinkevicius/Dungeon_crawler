import React from "react";

export default function Weapon(props) {
    return(
        <button onClick={props.buyFunction} style={{backgroundImage:`url(${props.url})`}}>
            {props.name}
        </button>
    )
}