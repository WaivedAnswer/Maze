import React from 'react'
import { getWeapon} from './weaponStyle'

const WeaponIcon = ({weaponType, occupied}) => {
    const weaponInfo = getWeapon(weaponType)
    const style = {
        backgroundColor: weaponInfo.color
    }
    if(occupied) {
        style.opacity = "30%"
    }

    const imgStyle = {
        width: "100%",
    }
    return (
        <div className='toolbar-icon' style={style}>
            <img src={weaponInfo.img} style={imgStyle} alt='toolbar weapon indicator' />
        </div>
    )
}

export default WeaponIcon