import React, {useEffect, useState} from 'react'
import {HashRouter, Navigate, NavLink, Route, Routes} from 'react-router-dom'
import {ConfigProvider, Divider, Layout, Menu, Switch} from 'antd'
import type {MenuProps, MenuTheme} from 'antd/es/menu'
import {MessageOutlined, PlayCircleOutlined, SearchOutlined, SettingOutlined, UserOutlined} from '@ant-design/icons'
import 'antd/dist/reset.css'
import {connect, Provider, useDispatch, useSelector} from 'react-redux'
import {compose} from 'redux'
import {initializeApp} from './redux/app-reducer'
import Preloader from './components/common/Preloader/Preloader'
import store, {AppDispatch, AppStateType} from './redux/redux-store'
import {UsersPage} from './components/Users/UsersPage'
import {LoginPage} from './components/Login/LoginPage'
import DialogsContainer from './components/Dialogs/DialogsContainer'
import ProfileContainer from './components/Profile/ProfileContainer'
import {Header} from './components/Header/Header'
import {NotFound} from './components/NotFound/NotFound'
//const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'))
//const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'))
const {Content, Footer, Sider} = Layout

type MapPropsType = ReturnType<typeof mapStateToProps>

type MenuItem = Required<MenuProps>['items'][number];

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

const items: MenuItem[] = [
    getItem(<NavLink to="/profile">Profile</NavLink>, '1', <UserOutlined/>),
    getItem(<NavLink to="/dialogs">Messages</NavLink>, '2', <MessageOutlined/>),
    getItem(<NavLink to="/developers">Find Developers</NavLink>, '3', <SearchOutlined/>),
    getItem('Media', 'sub1', <PlayCircleOutlined/>, [
        getItem(<NavLink to="/*">Photo</NavLink>, '4'),
        getItem(<NavLink to="/*">Music</NavLink>, '5'),
        getItem(<NavLink to="/*">Video</NavLink>, '6'),
        getItem(<NavLink to="/*">Live Transmission</NavLink>, '7')
    ]),
    getItem('Setting', 'sub2', <SettingOutlined/>, [
        getItem(<NavLink to="/*">Setting</NavLink>, '8'),
        getItem(<NavLink to="/*">Setting</NavLink>, '9'),
        getItem(<NavLink to="/*">Submenu Setting</NavLink>, 'sub1-2', null,
            [getItem(<NavLink to="/*">Setting</NavLink>, '10'), getItem('Setting', '11')]),
    ])
]

const App: React.FC<MapPropsType> = (props) => {


    const catchAllUnhandledErrors = () => {
        alert('Some error occured')
    }
    useEffect(() => {
        initializeApp()
        window.addEventListener('unhandledrejection', catchAllUnhandledErrors)
        return () => {
            window.removeEventListener('unhandledrejection', catchAllUnhandledErrors)
        }
    }, [initializeApp])

    const [mode, setMode] = useState<'vertical' | 'inline'>('inline')
    const [theme, settheme] = useState<MenuTheme>('light')

    const changeMode = (value: boolean) => {
        setMode(value ? 'vertical' : 'inline')
    }

    const changeTheme = (value: boolean) => {
        settheme(value ? 'dark' : 'light')
    }
    const initialized = useSelector((state: AppStateType) => state.app.initialized)
    const dispatch: AppDispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeApp())
    }, [dispatch])


    if (!props.initialized) {
        return <Preloader/>
    }
    return (
        <ConfigProvider>
            <Layout>
                <Header/>
                <Content style={{padding: '0 50px'}}>
                    {/*<Breadcrumb style={{margin: '16px 0'}}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb>*/}
                    <Layout className="site-layout-background" style={{padding: '24px 0'}}>
                        <Sider theme={theme} style={{borderRadius: '10px'}} width={200}>
                            <Menu
                                style={{borderRadius: '10px'}}
                                defaultSelectedKeys={['1']}
                                //defaultOpenKeys={['sub1']}
                                mode={mode}
                                theme={theme}
                                items={items}
                            />
                            <Divider type="horizontal"/>
                            <Switch onChange={changeMode} style={{margin: '0 15px'}}/><a>Change Mode</a>
                            <Switch onChange={changeTheme} style={{margin: '15px 15px'}}/><a>Change Style</a>
                        </Sider>
                        <Content style={{padding: '0 24px', minHeight: 280}}>
                            <Routes>
                                <Route path="/profile" element={<ProfileContainer/>}/>
                                <Route path="/dialogs" element={<DialogsContainer/>}/>
                                <Route path="/developers" element={<UsersPage pageTitle={'Page Users'}/>}/>
                                <Route path="/login" element={<LoginPage/>}/>
                                <Route path="/" element={<Navigate to={'/profile'}/>}/>
                                <Route path="/profile/:userId" element={<ProfileContainer/>}/>
                                <Route path="*" element={<NotFound/>}/>
                            </Routes>
                        </Content>
                    </Layout>
                </Content>
                <Footer style={{textAlign: 'center'}}>Social Network Created by Vito</Footer>
            </Layout>
        </ConfigProvider>
    )
}

const mapStateToProps = (state: AppStateType) => ({
    initialized: state.app.initialized
})

let AppContainer = compose<React.ComponentType>(connect(mapStateToProps,
    {initializeApp}))(App)

const JSApp: React.FC = () => {
    return <HashRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </HashRouter>
}

export default JSApp