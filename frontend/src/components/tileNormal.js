import Item from "./item"


const NormalTile = ({tile, gameState }) => {
    let className = 'tile'
    return (
        <div className={className}>
            { tile.hasItem ? <Item item={tile.item} gameState={gameState}/> : null}
        </div>
       
    )
}

export default NormalTile