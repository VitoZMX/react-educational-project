import React from 'react'
import preloader from '../../../assets/images/preloader.svg'

let Preloader = (props) => {
    return <div style={{width: '25%', margin: '0 auto'}}>
        <img src={preloader}/>
    </div>
}

export default Preloader