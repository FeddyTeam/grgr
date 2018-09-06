import React from 'react'
import { Route, Link } from 'react-router-dom'
import { Login } from '../components'

class App extends React.Component {
    render() {
        return (
            <div className="grgr">
                <p>Hello World</p>
                <div>
                    <Link to="/login">Login</Link>
                </div>
                <div>
                    <Route path="/login" component={Login}/>
                </div>
            </div>
        )
    }
}

export default App
