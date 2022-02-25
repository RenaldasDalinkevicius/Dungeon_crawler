/*
import React, {useState, useEffect}from "react";
import Hero from "./components/Hero"
import Monster from "./components/Monster"
import "./css/style.css"
import MonsterData from "./data/Monsters"
import Weapons from "./data/Weapons"
import Weapon from "./components/Weapon"
import Shop from "./components/Shop"
import Fight from "./components/Fight"
import Bosses from "./data/Bosses"

export default function App() {
    // State
    const weaponArray = Weapons.data.weapons.map(weapon => {
        return <Weapon
            buyFunction = {() => buyEquipment(weapon)}
            key = {weapon.id}
            {...weapon}/>
    })
    const monsterArray = MonsterData.data.monsters
    const bossArray = Bosses.data.monster
    const [currentWeapon, setCurrentWeapon] = useState({
        currentWep: weaponArray[(0)].props.name,
        lowDmg: weaponArray[(0)].props.lowDmg,
        bigDmg: weaponArray[(0)].props.bigDmg,
        price: weaponArray[(0)].props.price,
        url: weaponArray[(0)].props.url
    })
    const [hero, setHero] = useState({
        health: randomNumber(50,55),
        isAlive: true,
        gold: 100,
        currentWeapon: currentWeapon.currentWep,
        potions: 3
    })
    const [monster, setMonster] = useState({
        isAlive: true,
        monsterTurn: false,
        randomNum: 0,
        randomBossNum: 0
    })
    const [buttonDisable, setButtonDisable] = useState(false)
    const [shop, setShop] = useState(false)
    const [fightAnimation, setFightAnimation] = useState(0)
    const [monsterFightAnimation, setMonsterFightAnimation] = useState(0)
    const [defeated, setDefeated] = useState(0)
    // useEffect
    useEffect(() => {
        setHero(prevHero => ({
            ...prevHero,
            attack: randomNumber(currentWeapon.lowDmg,currentWeapon.bigDmg),
            currentWeapon: currentWeapon.currentWep
        }))
    },[currentWeapon])
    useEffect(() => {
        if (monster.health<=0) {
            setDefeated(defeated + 1)
            setMonster(prevMonster => ({
                ...prevMonster,
                isAlive: false
            }))
            setHero(prevHero => ({
                ...prevHero,
                gold: hero.gold+100
            }))
        }
        else if (monster.monsterTurn && monster.isAlive) {
            setMonsterFightAnimation(1)
            setHero(prevHero => ({
                ...prevHero,
                health: hero.health-monster.attack
            }))
            setMonster(prevMonster => ({
                ...prevMonster,
                monsterTurn: false
            }))
        }
    },[monster.health])
    // stopped working?
    useEffect(() => {
        if (hero.health<=0) {
            setHero(prevHero => ({
                ...prevHero,
                isAlive: false
            }))
        }
    },[hero.health])
    function spawnMonster(i) {
        setMonster(prevMonster => ({
            ...prevMonster,
            health: i[(monster.randomNum)].health,
            attack: randomNumber(i[(monster.randomNum)].lowDmg,i[(monster.randomNum)].bigDmg),
            monsterImg: i[(monster.randomNum)].url,
            monsterWeapon: i[(monster.randomNum)].weapon,
            monsterName: i[(monster.randomNum)].name,
            weaponUrl: i[(monster.randomNum)].wepUrl,
            isAlive: true,
            monsterTurn: false
        }))
    }
    // Functions
    function changeShop() {
        if (shop) {
            setShop(false)
        } else {
            setShop(true)
        }
    }
    function buyEquipment(i) {
        if (hero.gold >= i.price) {
            setCurrentWeapon({
                currentWep: i.name,
                lowDmg: i.lowDmg,
                bigDmg: i.bigDmg,
                price: i.price,
                url: i.url
            })
            setHero(prevHero => ({
                ...prevHero,
                gold: hero.gold-i.price
            }))
        }
    }
    function buyPotion() {
        if (hero.gold >= Weapons.data.potions[0].price) {
            setHero(prevHero => ({
                ...prevHero,
                gold: hero.gold-Weapons.data.potions[0].price,
                potions: hero.potions+1
            }))
        }
    }
    function randomNumber(min,max) {
        return Math.floor(Math.random()*(max-min+1)+min)
    }
    function drinkPotion() {
        if (hero.potions) {
            setHero(prevHero => ({
                ...prevHero,
                health: hero.health+50,
                potions: hero.potions-1
            }))
        }
    }
    // arrow function inside tertiery function to choose bossrandomnum instead of randonum?
    useEffect(() => {
        if (defeated === 10) {
            spawnMonster(bossArray)
        } else {
            spawnMonster(monsterArray)
        }
    }, [monster.randomNum])
    function monsterSpawner() {
        if (defeated === 10) {
            setMonster({
                randomNum: Math.floor(Math.random()*bossArray.length)
            })
        } else {
            setMonster({
                randomNum: Math.floor(Math.random()*monsterArray.length)
            })
        }
    }
    function attack(event) {
        event.preventDefault()
        setButtonDisable(true)
        fightAnimationStart()
        setTimeout(() => setButtonDisable(false), 500)
        monster.isAlive?
        setMonster(prevMonster => ({
            ...prevMonster,
            health: monster.health-hero.attack,
            monsterTurn: true
        })) : 
        monsterSpawner()
    }
    function fightAnimationStart() {
        if (monster.isAlive) {
            setFightAnimation(1)
        }
    }
    return (
        <div className="main" style={{backgroundImage: shop?"url(https://i.pinimg.com/originals/50/c1/16/50c116f69d598373c72dd75b32e37389.jpg)":"url(https://rpg.nathanhare.net/media/dungeons-banner.png)"}}>
            <Hero 
            heroHealth={hero.health}
            heroAttack={hero.attack}
            currentWeaponEquiped={hero.currentWeapon}
            heroGold={hero.gold}
            heroPotions={hero.potions}
            changeShop={changeShop}
            monsterIsAlive={monster.isAlive}
            shopState={shop}/>
            {shop?<Shop
            healthPotionF={buyPotion}
            shopState={shop}
            weapons={weaponArray}/>:
            <Fight
            drinkPotion={drinkPotion}
            heroButtonAttack={attack}
            btnDisable={buttonDisable}
            heroIsAlive={!hero.isAlive}
            monsterIsAlive={monster.isAlive}
            currentWeapon={currentWeapon.url}
            monsterWeaponUrl={monster.weaponUrl}
            fightAnimationEnd={()=> setFightAnimation(0)}
            fightAnimationState={fightAnimation}
            monsterFightAnimationEnd={() => setMonsterFightAnimation(0)}
            monsterFightAnimationState={monsterFightAnimation}/>}
            <Monster 
            monsterHealth={monster.health}
            monsterAttack={monster.attack}
            monsterIsAlive={monster.isAlive}
            monsterImg={monster.monsterImg}
            monsterName={monster.monsterName}
            monsterWeapon={monster.monsterWeapon}/>
        </div>
    )
}
/*
    useEffect(() => {
        setMonster(prevMonster => ({
            ...prevMonster,
            health: monsterArray[(monster.randomNum)].health,
            attack: randomNumber(monsterArray[(monster.randomNum)].lowDmg,monsterArray[(monster.randomNum)].bigDmg),
            monsterImg: monsterArray[(monster.randomNum)].url,
            monsterWeapon: monsterArray[(monster.randomNum)].weapon,
            monsterName: monsterArray[(monster.randomNum)].name,
            weaponUrl: monsterArray[(monster.randomNum)].wepUrl,
            isAlive: true,
            monsterTurn: false
        }))
    }, [monster.randomNum])
*/