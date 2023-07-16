import rockTile from "../images/rock.png"

const Barrier = () => {
    let className = 'tile-exit'
    const tileImg = rockTile
    className = 'tile-wall'

    return (
        <div className={className}>
            <img src={tileImg} className="tile-image"  alt='' /> 
        </div>
    )
}

export default Barrier