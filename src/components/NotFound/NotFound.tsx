import React from 'react'
import {Button, Result} from 'antd'
import {useNavigate} from 'react-router-dom'

export const NotFound: React.FC = () => {
    const navigate = useNavigate()

    const handleBackHome = () => {
        navigate('/')
    }

    return (<Result
        status="404"
        title="404"
        subTitle="Sorry, the page you are trying to access is still under development."
        extra={<Button type="primary" onClick={handleBackHome}>Back Home</Button>}
    />)
}