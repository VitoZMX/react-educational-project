import './App.css';

const App = () => {
    return (
        <div>
            <Header/>
            <Technologies/>
        </div>
    )
}

const Technologies = () => {
    return (
        <div>
            <ul>
                <li>CSS</li>
                <li>HTML</li>
                <li>JS</li>
                <li>React</li>
            </ul>
        </div>
    )
}

const Header = () => {
    return (
        <div>
            <a href='#'>Home</a>
            <a href='#'>New Feed</a>
            <a href='#'>Messages</a>
        </div>
    )
}
export default App;