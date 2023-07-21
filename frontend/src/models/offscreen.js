import {TileDirection} from"../models/tileDirection"


const getHorizontalOffset = (boardRect, tokenRect) => {
    const left = Math.max(boardRect.left, tokenRect.left)
    if(left < boardRect.right - tokenRect.width) {
        return {left: left}
    } else {
        return {right: window.innerWidth - boardRect.right}
    }
}

const getVerticalOffset = (boardRect, tokenRect) => {
    const top = Math.max(boardRect.top, tokenRect.top)
    if(top < boardRect.bottom - tokenRect.height) {
        return {top: top}
    } else {
        return {bottom: window.innerHeight - boardRect.bottom}
    }
}

const getOffsets = (boardRect, tokenRect) => {
    return { ...getHorizontalOffset(boardRect, tokenRect),
        ...getVerticalOffset(boardRect, tokenRect)}
}

const getIndicatorInfo = (myRef, parent) => {
    if(!myRef.current || !parent.current) {
        return null
    }
    const tokenRect = myRef.current.getBoundingClientRect()
    const boardRect = parent.current.getBoundingClientRect()
    const isInView = (
        tokenRect.top <= boardRect.bottom &&
        tokenRect.left <= boardRect.right &&
        tokenRect.bottom >= boardRect.top &&
        tokenRect.right >= boardRect.left
    );
    if(isInView) {
        return null
    }
    const upDist = boardRect.top - tokenRect.bottom
    const downDist = tokenRect.top - boardRect.bottom
    const leftDist = boardRect.left - tokenRect.right
    const rightDist = tokenRect.left - boardRect.right


    const maxDist = Math.max(upDist, downDist, leftDist, rightDist)
    const offsets = getOffsets(boardRect, tokenRect)
    if(upDist === maxDist) {
       return {direction: TileDirection.UP, 
            ...offsets}
    } else if(downDist === maxDist) {
        return {direction: TileDirection.DOWN,
            bottom: window.innerHeight - boardRect.bottom,
            ...offsets}
    } else if(rightDist === maxDist) {
        return{direction: TileDirection.RIGHT,
            ...offsets}
    } else if(leftDist === maxDist) {
        return{direction: TileDirection.LEFT,
            ...offsets}
    } else {
        throw new Error("No direction specified")
    }
}

export { getIndicatorInfo }