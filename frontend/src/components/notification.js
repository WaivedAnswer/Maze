import React from 'react'

const Notification = ({ notification }) => {
    if (notification === null) {
        return null
    }

    return (
        <div className={notification.isGood ? 'notification' : 'notification-bad'}>
            {notification.message}
        </div>
    )
}

export default Notification