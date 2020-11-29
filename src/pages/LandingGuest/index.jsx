import React, { useState, useContext } from 'react'
import {AppContext} from '../../config/Context'
import axios from 'axios'
import {useHistory} from 'react-router-dom'
import {Modal} from 'react-bootstrap'
import Content from '../../components/molecules/Content'
import './LandingGuest.scss'
import {ReactComponent as Logo} from '../../assets/logos/Logo.svg'
import ButtonLandingLogin from '../../components/atoms/ButtonLandingLogin'
import ButtonLandingRegister from '../../components/atoms/ButtonLandingRegister'
import Gap from '../../components/atoms/Gap'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from '../../components/atoms/Button'
import User from '../../API/User'

const LandingGuest = () => {
    //Context
    const [state, dispatch] = useContext(AppContext);
    //Modal
    const [loginShow, setLoginShow] = useState(false)
    const [registerShow, setRegisterShow] = useState(false)
    //OnChange input login
    const [emailLogin, setEmailLogin] = useState("")
    const [passwordLogin, setPasswordLogin] = useState("")
    //OnChange input register
    const [emailRegister, setEmailRegister] = useState("")
    const [passwordRegister, setPasswordRegister] = useState("")
    const [fullnameRegister, setFullnameRegister] = useState("")

    const router = useHistory();

    const handleSubmitLogin = e => {
        e.preventDefault()

        axios.get('http://localhost:3000/users')
            .then(function (response) {
                const findUser = response.data.find((email) => email.email === emailLogin)
                console.log("hasil findUser", findUser)
                if(findUser == undefined) {
                    alert("Email atau Password yang anda masukkan salah")
                } else if (emailLogin === findUser.email && passwordLogin === findUser.password && findUser.isAdmin == false) {
                    dispatch({
                        type: "LOGIN",
                        uid: findUser.id
                    })
                    router.push('/home')
                } else if (emailLogin === findUser.email && passwordLogin === findUser.password && findUser.isAdmin == true) {
                    dispatch({
                        type: "LOGIN"
                    })
                    router.push('/admin')
                }
            })
            .catch(function (error) {
                // handle error
                console.log(error);
        })

        // const findUser = User.find((email) => email.email === emailLogin)


    }

    const handleSubmitRegister = e => {
        e.preventDefault()

        let timestamp = new Date().getTime()
        axios.post('http://localhost:3000/users', {
                id: timestamp,
                name: fullnameRegister,
                email: emailRegister,
                password: passwordRegister,
                isAdmin: false
            }, (err) => {
                console.log('error', err)
            }   
        )
        .then(
            setEmailRegister(""),
            setPasswordRegister(""),
            setFullnameRegister(""),
            alert("Akun berhasil dibuat"),
            toLoginShow()
        )
    }

    const toLoginShow = () => {
        setRegisterShow(false)
        setLoginShow(true)
    }

    const toRegisterShow = () => {
        setRegisterShow(true)
        setLoginShow(false)
    }

    return (
        <Container fluid>
            <Row>
                <Col sm={8} className="logo-header-guest">
                    <Logo />
                </Col>
                <Col sm={4} className="button-header-guest">
                    <ButtonLandingLogin onClick={() => setLoginShow(true)} title="Login" />
                    <ButtonLandingRegister onClick={() => setRegisterShow(true)} title="Register"/>
                </Col>
            </Row>
            <Row>
                <Col className="content-guest">
                    <Content />
                </Col>
            </Row>
            <Modal
                    size="lg"
                    show={loginShow}
                    onHide={() => setLoginShow(false)}
                    centered
                    dialogClassName="modal-login">
                    <Modal.Body>
                    <div className="login-wrapper">
                        <form>
                            <p className="title-login">Login</p>
                            <input className="form-input" value={emailLogin} onChange={e => setEmailLogin(e.target.value)} type="text" placeholder="Email" />
                            <Gap height={20} />
                            <input className="form-input" value={passwordLogin} onChange={e => setPasswordLogin(e.target.value)} type="password" placeholder="Password" />
                            <Gap height={29} />
                            <Button title="Login" onClick={(e) => handleSubmitLogin(e)} />
                            <p className="to-register">Don't have an account ? Click <strong className="cursor-pointer" onClick={toRegisterShow}>Here</strong></p>
                        </form>
                    </div>
                    </Modal.Body>
                </Modal>
                <Modal
                    size="lg"
                    show={registerShow}
                    onHide={() => setRegisterShow(false)}
                    centered
                    dialogClassName="modal-register">
                    <Modal.Body>
                    <div className="register-wrapper">
                        <form>
                            <p className="title-register">Register</p>
                            <input className="form-input" value={emailRegister} onChange={e => setEmailRegister(e.target.value)} type="text" placeholder="Email" />
                            <Gap height={20} />
                            <input className="form-input" value={passwordRegister} onChange={e => setPasswordRegister(e.target.value)} type="password" placeholder="Password" />
                            <Gap height={20} />
                            <input className="form-input" value={fullnameRegister} onChange={e => setFullnameRegister(e.target.value)} type="text" placeholder="Full Name" />
                            <Gap height={29} />
                            <Button title="Register" onClick={(e) => handleSubmitRegister(e)} />
                            <p className="to-login">Already have an account ? Click <strong className="cursor-pointer" onClick={toLoginShow}>Here</strong></p>
                        </form>
                    </div>
                    </Modal.Body>
                </Modal>
        </Container>
    )
}

export default LandingGuest
