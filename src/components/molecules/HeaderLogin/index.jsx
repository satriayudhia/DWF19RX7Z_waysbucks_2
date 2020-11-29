import React, {useContext} from 'react'
import {AppContext} from '../../../config/Context'
import {useHistory} from 'react-router-dom'
import './HeaderLogin.scss'
import {ReactComponent as Logo} from '../../../assets/logos/Logo.svg'
import {ReactComponent as Avatar} from '../../../assets/avatar/avatar.svg'
import {ReactComponent as Cart} from '../../../assets/logos/cart.svg'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'
import {ReactComponent as ProfileBtn} from '../../../assets/logos/profile-btn.svg'
import {ReactComponent as LogoutBtn} from '../../../assets/logos/logoutBtn.svg'

const HeaderLogin = () => {
    //Context
    const [state, dispatch] = useContext(AppContext);

    const router = useHistory();

    const toHome = () => {
        router.push("/home")
    }
    const toCart = () => {
        router.push("/cart")
    }
    const toProfile = () => {
        router.push("/profile")
    }
    const toLogin = () => {
        dispatch({
            type: "LOGOUT"
        })
        router.push("/")
    }

    return (
        <Container fluid>
            <Row>
                <Col sm={8} className="logo-header">
                    <Logo className="logo-header-cursor" onClick={toHome}/>
                </Col>
                <Col sm={4} className="profile-header">
                    <Cart className="cart-header" onClick={toCart}/>
                    <OverlayTrigger
                        trigger="click"
                        key='bottom'
                        placement='bottom'
                        overlay={
                            <Popover id={'popover-positioned-bottom'}>
                            <Popover.Content>
                                <ProfileBtn onClick={toProfile} style={{width: "60%", cursor: "pointer"}}/>
                            </Popover.Content>
                            <Popover.Content>
                                <LogoutBtn onClick={toLogin} style={{width: "60%", cursor: "pointer"}}/>
                            </Popover.Content>
                            </Popover>
                        }
                        >
                        <Avatar className="avatar-header" />
                    </OverlayTrigger>
                </Col>
            </Row>
            
        </Container>
    )
}

export default HeaderLogin
