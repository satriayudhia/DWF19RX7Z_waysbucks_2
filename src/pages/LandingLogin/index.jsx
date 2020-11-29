import React, {useContext} from 'react'
import {AppContext} from '../../config/Context'
import Content from '../../components/molecules/Content'
import './LandingLogin.scss'
import HeaderLogin from '../../components/molecules/HeaderLogin'


const LandingLogin = () => {
    const [state] = useContext(AppContext);
    console.log('user Id', state.idUser)
    return (
            <div>
                <div>
                    <HeaderLogin/>
                </div>
                <div className="content-wrapper-login">
                    <Content /> 
                </div>
            </div>
    )
}

export default LandingLogin
