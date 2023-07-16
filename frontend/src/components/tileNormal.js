import { TileType } from "../models/tile"
import { TokenType } from "../models/token"

import Item from "./item"
import Connect from "./tileConnect"
import Portal from "./tilePortal"
import Exit from "./tileExit"
import Barrier from "./tileBarrier"


const NormalTile = ({tile }) => {
    let className = 'tile'
    return (
        <div className={className}>
            { tile.hasItem ? <Item item={tile.item}/> : null}
        </div>
       
    )
}

export default NormalTile