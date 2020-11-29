import React, {useContext, useState, useEffect} from 'react'
import {AppContext} from '../../../config/Context'
import {useHistory} from 'react-router-dom'
import axios from 'axios'
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
    const [state, dispatch] = useContext(AppContext)

    const [user, setUser] = useState([])
    const [image, setImage] = useState('')

    const router = useHistory();

    useEffect(() => {
        axios.get(`http://localhost:3000/users/${state.idUser}`)
            .then(function (response) {
                // handle success
                setUser(response.data)
                setImage(response.data.profpic)
                console.log("res", response.data)
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }, [])

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
                    {
                        state.carts == 0 ? (<p></p>) : (<p className="notif">{state.carts}</p>)
                    }
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
                        <img src={image} className="avatar-header"/>
                        {/* <Avatar className="avatar-header" /> */}
                    </OverlayTrigger>
                </Col>
            </Row>
            
        </Container>
    )
}

export default HeaderLogin
