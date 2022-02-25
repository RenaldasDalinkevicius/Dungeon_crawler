import React from "react"
export default function Hero(props) {
    return (
        <div className="hero_main">
            <div className="hero_img">
                <img src="https://oldschool.runescape.wiki/images/Steve.png?dd42e" className={props.heroIsAlive?"dead":""}/>
            </div>
            <div className="hero_grid">
                <p className="hero_health">{props.heroIsAlive?`You have died!`:`${props.heroHealth} HP`}</p>
                <p className="hero_attack">{props.heroAttack} DMG</p>
                <p className="current_weapon">{props.currentWeaponEquiped}</p>
                <p className="hero_gold">Gold: {props.heroGold}</p>
                <button className="shop_button"disabled={props.monsterIsAlive} onClick={props.changeShop}>{props.shopState?"Close Shop":"Open Shop"}</button>
                <p className="potion_left">{props.heroPotions}x {props.heroPotions>1?"Potions":"Potion"}</p>
            </div>
        </div>
    )
}