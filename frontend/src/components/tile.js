const Tile = ({ num, selected }) => {
    return (
        <div className={selected ? 'tile-selected' : 'tile'}>
            {num}
        </div>
    )
}

export default Tile