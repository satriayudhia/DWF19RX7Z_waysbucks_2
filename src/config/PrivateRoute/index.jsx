import React, {useContext} from 'react'
import {Route, Redirect} from 'react-router-dom'
import {AppContext} from '../Context'

const PrivateRoute = ({component: Component, ...rest}) => {
    const [state] = useContext(AppContext)

    return (
        <Route
            {...rest}
            render={(props) => 
                state.isLogin == true ? <Component {...props} /> : <Redirect to='/'/>
            } 
        />
    )
}

export default PrivateRoute
