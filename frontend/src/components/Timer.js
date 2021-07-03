import React from 'react'

const Timer = ({ remainingSeconds }) => {
    if (!remainingSeconds) {
        return ""
    }
    const getTimeStr = (num) => {
        const paddedString = "00" + num
        return paddedString.substr(paddedString.length - 2)
    }
    const minutes = getTimeStr(Math.floor(remainingSeconds / 60))
    const seconds = getTimeStr(remainingSeconds % 60)

    const criticalTime = 10
    const className = remainingSeconds > criticalTime ? 'timer' : 'timer-critical'
    return (
        <div className={className}>
            {`${minutes}:${seconds}`}
        </div>
    )
}

export default Timer