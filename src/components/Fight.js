import React, {useState, useEffect} from "react";
import "../css/animation.css"
import Flame from "./spells/Flame";
import Stun from "./spells/Stun";

export default function Fight(props) {
    const [fightAnimation, setFightAnimation] = useState(0)
    const [monsterFightAnimation, setMonsterFightAnimation] = useState(0)
    useEffect(() => {
        if (props.monsterHealth>0 && props.monsterTurn && props.monsterIsAlive && !props.stunned)
        {
            setMonsterFightAnimation(1)
        }
    },[props.monsterHealth])
    return (
        <div className="fight_main">
            <img src={props.currentWeapon} className="fight_wep" onAnimationEnd={() =>setFightAnimation(0)} attack={fightAnimation}/>
            <img src={props.monsterWeaponUrl} className="monster_wep" onAnimationEnd={()=>setMonsterFightAnimation(0)} attack={monsterFightAnimation}/>
            <button className="attack_button" onClick={() => {if (props.monsterIsAlive)setFightAnimation(1);props.heroButtonAttack()}} disabled={props.heroIsAlive || props.btnDisable}>{props.monsterIsAlive?"Attack!":"Go again!"}</button>
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