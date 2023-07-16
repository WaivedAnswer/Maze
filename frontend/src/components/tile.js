import { TileType } from "../models/tile"

import Connect from "./tileConnect"
import Portal from "./tilePortal"
import Exit from "./tileExit"
import Barrier from "./tileBarrier"
import NormalTile from "./tileNormal"
import UnknownTile from "./tileUnknown"


const Tile = ({tile, onTeleport, getTileDirection, gameState }) => {
    let content
    switch (tile.type) {
        case TileType.EXIT:
            content = <Exit tile={tile} gameState={gameState} />
            break
        case TileType.WALL:
            content = <Barrier/>
            break
        case TileType.UNKNOWN:
            content = <UnknownTile />
            break
        case TileType.CONNECT:
            content = <Connect tile={tile} gameState={gameState} getTileDirection={getTileDirection} />
            break
        case TileType.PORTAL:
            content = <Portal tile={tile} gameState={gameState} onTeleport={onTeleport}/>
            break
        case TileType.NORMAL:
            content = <NormalTile tile={tile}/>
            break
        default:
            throw new Error("Invalid tile type")
    }

    const tileStyle = (tileCoord) => {
        const style =  {
        gridColumnStart: `${tileCoord.x + 1}`,
        gridRowStart: `${tileCoord.y + 1}`,
     }
     return style
    }

    return (
        <div className='tile-container' style={tileStyle(tile.coord)}>
            { content }
           
        </div>
       
    )
}

export default Tile