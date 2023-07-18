import {TileDirection} from"../models/tileDirection"

const getRightOffset = (boardRect, tokenRect) => {
    return Math.min(boardRect.width, Math.max(boardRect.right - tokenRect.right, 0))
}

const getBottomOffset = (boardRect, tokenRect) => {
    return Math.min(boardRect.height, Math.max(boardRect.bottom - tokenRect.bottom, 0))
} 

const getIndicatorInfo = (myRef, parent) => {
    if(!myRef.current || !parent.current) {
        return null
    }
    const tokenRect = myRef.current.getBoundingClientRect()
    const boardRect = parent.current.getBoundingClientRect()
    const isInView = (
        tokenRect.top < boardRect.bottom &&
        tokenRect.left < boardRect.right &&
        tokenRect.bottom > boardRect.top &&
        tokenRect.right > boardRect.left
    );
    if(isInView) {
        return null
    }
    const upDist = boardRect.top - tokenRect.bottom
    const downDist = tokenRect.top - boardRect.bottom
    const leftDist = boardRect.left - tokenRect.right
    const rightDist = tokenRect.left - boardRect.right


    const maxDist = Math.max(upDist, downDist, leftDist, rightDist)
    if(upDist === maxDist) {
       return {direction: TileDirection.UP, 
            bottom: 0,
            right: getRightOffset(boardRect, tokenRect)}
    } else if(downDist === maxDist) {
        return {direction: TileDirection.DOWN,
            bottom: 0,
            right: getRightOffset(boardRect, tokenRect)}
    } else if(rightDist === maxDist) {
        return{direction: TileDirection.RIGHT,
            bottom:  getBottomOffset(boardRect, tokenRect),
            right: 0}
    } else if(leftDist === maxDist) {
        return{direction: TileDirection.LEFT,
            bottom:  getBottomOffset(boardRect, tokenRect),
            right: 0}
    } else {
        throw new Error("No direction specified")
    }
}

export { getIndicatorInfo }