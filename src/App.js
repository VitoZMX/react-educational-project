import React, {Suspense} from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import {connect, Provider} from 'react-redux'
import {compose} from 'redux'
import {initializeApp} from './redux/app-reducer'
import Preloader from './components/common/Preloader/Preloader'
import store from './redux/redux-store'
//import DialogsContainer from './components/Dialogs/DialogsContainer'
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'))
import UsersContainer from './components/Users/UsersContainer'
//import ProfileContainer from './components/Profile/ProfileContainer'
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'))
import HeaderContainer from './components/Header/HeaderContainer'
import Login from './components/Login/Login'

class App extends React.Component {

    componentDidMount() {
        this.props.initializeApp()
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }
        return (
            <div className='app-wrapper'>
                <HeaderContainer/>
                <Navbar/>
                <div className='app-wrapper-content'>
                    <Suspense fallback={<div><Preloader/></div>}>
                        <Routes>
                            <Route path='/profile/:userId' element={<ProfileContainer/>}/>
                            <Route path='/profile/*' element={<ProfileContainer/>}/>
                            <Route path='/dialogs/*' element={<DialogsContainer/>}/>
                            <Route path='/users/*' element={<UsersContainer/>}/>
                            <Route path='/login' element={<Login/>}/>
                        </Routes>
                    </Suspense>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized
})

let AppContainer = compose(connect(mapStateToProps, {initializeApp}))(App)

const JSApp = (props) => {
    return <BrowserRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </BrowserRouter>
}

export default JSApp