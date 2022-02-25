import React , {useEffect, useState} from "react";
import Spells from "../data/spells"
export default function Spell(props) {
    const Spell = Spells.data.spells
    const [stunState, setStunState] = useState({
        coolDown: false,
        coolDownTimer: 0,
        stunDuration: 0
    })
    const [flameState, setFlameState] = useState({
        coolDown: false,
        coolDownTimer: 0
    })
    useEffect(() => {
        if (props.monsterHealth<=0) {
            if (stunState.coolDown) {
                setStunState(prevStun => ({
                    ...prevStun,
                    coolDownTimer: stunState.coolDownTimer-1
                }))
            }
            if (flameState.coolDown) {
                setFlameState(prevFlame => ({
                    ...prevFlame,
                    coolDownTimer: flameState.coolDownTimer-1
                }))
            }
        }
        props.stunned&&stunState.stunDuration?setStunState(prevStun => ({
            ...prevStun,
            stunDuration: stunState.stunDuration-1
        })):props.unStun
    }, [props.monsterHealth])
    useEffect(() => {
        if (props.stunned) {
            setStunState(prevStun => ({
                ...prevStun,
                coolDownTimer:Spell.stun.CD
            }))
        }
    }, [stunState.coolDown])
    useEffect(() => {
        if (!stunState.coolDownTimer) {
            setStunState(prevStun => ({
                ...prevStun,
                coolDown: false
            }))
        }
    }, [stunState.coolDownTimer])
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
    function stun() {
        if (props.monsterIsAlive) {
            props.stun()
            setStunState(prevStun => ({
                ...prevStun,
                coolDown: true,
                coolDownTimer: Spell.stun.CD,
                stunDuration: Spell.stun.stunDuration
            }))
        }
    }
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
        <div>
            <button  className="stun_button" onClick={stun} disabled={stunState.coolDown}>{stunState.coolDown?`CD ${stunState.coolDownTimer}`:"Stun"}</button>
            <button className="flame_button" onClick={flame} disabled={flameState.coolDown}>{flameState.coolDown?`CD ${flameState.coolDownTimer}`:"Flame"}</button>
        </div>
    )
}