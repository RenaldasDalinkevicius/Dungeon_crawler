import React, {useEffect, useState} from "react"
import "../css/animation.css"
export default function Monster(props) {
    const [stunned, setStunned] = useState(0)
    useEffect(() => {
        props.stunned?setStunned(1):setStunned(0)
    }, [props.stunned])
    return (
        <div className="monster_main">
            <div className="monster_img">
                <img src={props.monsterImg} className={props.monsterIsAlive?"monster_img_img":"monster_img_img dead"} stunned={stunned}/>
            </div>  
                <div className="monster_grid">
                <p className="monster_health">{props.monsterHealth} HP</p>
                <p className="monster_attack">{props.monsterAttack} DMG</p>
                <p className="monster_weapon">{props.monsterWeapon}</p>
                <p className="monster_name">{props.monsterName}</p>
                <p className="monster_status" style={{backgroundColor: props.monsterIsAlive?"#094900":"#500000"}}>Enemy is {props.monsterIsAlive?"alive":"defeated"}</p>
            </div>
        </div>
    )
}