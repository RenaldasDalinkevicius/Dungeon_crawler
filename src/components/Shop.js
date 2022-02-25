import React from "react";

export default function Shop(props) {
    return (
        <div className="shop">
            <div className="shop_items" style={{display: props.shopState?"grid":"none"}}>
                {props.weapons}
                <button onClick={props.healthPotionF} disabled={props.monsterIsAlive} style={{backgroundImage:"url(https://th.bing.com/th/id/R.9fd2d61cfcdc558305f6b8831d85d4d0?rik=4e%2fuAf9nrn871g&riu=http%3a%2f%2fvignette2.wikia.nocookie.net%2f2007scape%2fimages%2f5%2f56%2fSaradomin_brew_detail.png%2frevision%2flatest%3fcb%3d20130328210518&ehk=MQbNbfVRY9kER%2bI4sZMvfk90LjHBuAOW8SOlhvTG4gg%3d&risl=&pid=ImgRaw&r=0)"}}>Health Potion</button>
            </div>
        </div>
    )
}
