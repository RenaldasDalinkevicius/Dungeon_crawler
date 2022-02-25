import React , {useEffect, useState} from "react";
import Spells from "../../data/spells"
export default function Flame(props) {
    const Spell = Spells.data.spells
    const [flameState, setFlameState] = useState({
        coolDown: false,
        coolDownTimer: 0
    })
    useEffect(() => {
        if (props.monsterHealth<=0) {
            if (flameState.coolDown) {
                setFlameState(prevFlame => ({
                    ...prevFlame,
                    coolDownTimer: flameState.coolDownTimer-1
                }))
            }
        }
    }, [props.monsterHealth])
    useEffect(() => {
        if (flameState.coolDown) {
            setFlameState(prevFlame => ({
                ...prevFlame,
                coolDownTimer:Spell.flame.CD
            }))
        }
    }, [flameState.coolDown])
    useEffect(() => {
        if (!flameState.coolDownTimer) {
            setFlameState(prevFlame => ({
                ...prevFlame,
                coolDown: false
            }))
        }
    }, [flameState.coolDownTimer])
    function flame() {
        if (props.monsterIsAlive) {
            props.flame()
            setFlameState(prevFlame => ({
                ...prevFlame,
                coolDown: true
            }))
        }   
    }
    return (
        <button className="flame_button" onClick={flame} disabled={flameState.coolDown}>{flameState.coolDown?`CD ${flameState.coolDownTimer}`:`${Spell.flame.name}`}</button>
    )
}