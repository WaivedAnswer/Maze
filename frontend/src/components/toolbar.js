import React from 'react'

const Toolbar = ({ remaining }) => {
    return (
        <div className='toolbar'>
            {remaining ? "Remaining Sections: " + remaining : ""}
        </div>
    )
}

export default Toolbar