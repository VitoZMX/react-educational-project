import React, {Suspense} from 'react'
import {HashRouter, Navigate, Route, Routes} from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import {connect, Provider} from 'react-redux'
import {compose} from 'redux'
import {initializeApp} from './redux/app-reducer'
import Preloader from './components/common/Preloader/Preloader'
import store, {AppStateType} from './redux/redux-store'
import HeaderContainer from './components/Header/HeaderContainer'
import {UsersPage} from './components/Users/UsersPage'
import {LoginPage} from './components/Login/LoginPage'
//import DialogsContainer from './components/Dialogs/DialogsContainer'
//import ProfileContainer from './components/Profile/ProfileContainer'
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'))
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'))

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
    initializeApp: () => void
}

class App extends React.Component<MapPropsType & DispatchPropsType> {

    catchAllUnhandledErrors = (e: PromiseRejectionEvent) => {
        alert('Some error occured')
    }

    componentDidMount() {
        this.props.initializeApp()
        window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors)
    }

    componentWillUnmount() {
        window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors)
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }
        return (
            <div className="app-wrapper">
                <HeaderContainer/>
                <Navbar/>
                <div className="app-wrapper-content">
                    <Suspense fallback={<div><Preloader/></div>}>
                        <Routes>
                            <Route path="/profile/:userId" element={<ProfileContainer/>}/>
                            <Route path="/profile/*" element={<ProfileContainer/>}/>
                            <Route path="/dialogs/*" element={<DialogsContainer/>}/>
                            <Route path="/users/*" element={<UsersPage pageTitle={'Page Users'}/>}/>
                            <Route path="/login" element={<LoginPage/>}/>
                            <Route path="/" element={<Navigate to={'/profile'}/>}/>
                            <Route path="*" element={<div>404 NOT FOUND</div>}/>
                        </Routes>
                    </Suspense>
                </div>
            </div>
        )
    }
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