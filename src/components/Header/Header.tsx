import React from 'react'
import {NavLink} from 'react-router-dom'
import {Avatar, Button, Col, Layout, Menu, Row} from 'antd'
import {useDispatch, useSelector} from 'react-redux'
import {selectCurrentUserLogin, selectIsAuth} from '../../redux/auth-selectors'
import {AppDispatch} from '../../redux/redux-store'
import {logout} from '../../redux/auth-reducer'
import {IdcardOutlined, LoginOutlined, LogoutOutlined, UserOutlined} from '@ant-design/icons'
import {MenuProps} from 'antd/es/menu'
import logo from '../../assets/images/cat.png'

export type MapPropsType = {}

type MenuItem = Required<MenuProps>['items'][number]

const items: MenuItem[] = [
    getItem(<NavLink to="/developers">Developers</NavLink>, '1', <IdcardOutlined/>),
]

function getItem(
    label: React.ReactNode,
    key?: React.Key | null,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem
}

export const Header: React.FC<MapPropsType> = (props) => {

    const isAuth = useSelector(selectIsAuth)
    const login = useSelector(selectCurrentUserLogin)

    const dispatch: AppDispatch = useDispatch()

    const logoutCallback = () => {
        dispatch(logout())
    }

    const {Header} = Layout

    return <Header className="header">
        <Row>
            <Col span={2} className="logo">
                <img src={logo} style={{width: '80px'}} alt="logo"/>
            </Col>
            <Col span={16}>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['2']}
                    items={items}
                />
            </Col>
            {isAuth
                ? <> <Col span={1}>
                    <Avatar style={{backgroundColor: '#1677ff'}} icon={<UserOutlined/>}/>
                </Col>
                    <Col span={1}>
                        <a>{login}</a>
                    </Col>
                    <Col span={4}>
                        <Button onClick={logoutCallback}><LogoutOutlined/>Log out</Button>
                    </Col>
                </>
                : <Col span={6}>
                    <Button>
                        <NavLink to={'/login'}><LoginOutlined/> Login</NavLink>
                    </Button>
                </Col>}
        </Row>
    </Header>
}