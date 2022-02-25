import React from "react";
import "../css/animation.css"
import Flame from "./spells/Flame";
import Stun from "./spells/Stun";

export default function Fight(props) {
    return (
        <div className="fight_main">
            <img src={props.currentWeapon} className="fight_wep" onAnimationEnd={props.fightAnimationEnd} attack={props.fightAnimationState}/>
            <img src={props.monsterWeaponUrl} className="monster_wep" onAnimationEnd={props.monsterFightAnimationEnd} attack={props.monsterFightAnimationState}/>
            <button className="attack_button" onClick={props.heroButtonAttack} disabled={props.heroIsAlive || props.btnDisable}>{props.monsterIsAlive?"Attack!":"Go again!"}</button>
            <button className="potion_button" onClick={props.drinkPotion} disabled={props.heroIsAlive}>Drink potion</button>
            <Stun 
            monsterHealth={props.monsterHealth}
            monsterIsAlive={props.monsterIsAlive}
            stunned={props.stunned}
            stun={props.stun}
            unStun={props.unStun}/>
            <Flame 
            monsterHealth={props.monsterHealth}
            monsterIsAlive={props.monsterIsAlive}
            flame={props.flame}/>
        </div>
    )
}