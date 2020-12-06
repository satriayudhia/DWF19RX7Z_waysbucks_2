import React, { useState, useContext } from 'react'
import {AppContext} from '../../config/Context'
import Axios from 'axios'
import {Formik, Form} from 'formik'
import * as Yup from 'yup'
import FormikControl from '../../components/atoms/FormikControl'
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

const LandingGuest = () => {
    //Context
    const [dispatch] = useContext(AppContext);
    //Modal
    const [loginShow, setLoginShow] = useState(false)
    const [registerShow, setRegisterShow] = useState(false)

    const initialValuesLogin = {
        email: '',
        password: ''
    }

    const initialValuesRegister = {
        email: '',
        password: '',
        fullname: ''
    }

    const router = useHistory()

    const validationSchemaLogin = Yup.object({
        email: Yup.string().email('Invalid email format').required('required'),
        password: Yup.string().required('Required')
    })

    const validationSchemaRegister = Yup.object({
        email: Yup.string().email('Invalid email format').required('required'),
        password: Yup.string().min(8, 'Minimum password is 8 characters').required('Required'),
        fullname: Yup.string().min(3, 'Minimum fullname is 3 characters').required('Required')
    })

    const handleSubmitLogin = (values) => {
        console.log('Form data', values)

        const promise = new Promise((resolve, reject) => {
            Axios.post('http://localhost:3001/api/v1/login', 
            {email: values.email, password: values.password})
            .then((result) => {
                resolve(result)
                if (result.data.status === 'success' && result.data.data.isAdmin == 0) {
                    dispatch({
                        type: 'LOGIN',
                        uid: result.data.data.id
                    })
                    router.push('/home')
                }
                else if (result.data.status === 'success' && result.data.data.isAdmin == 1) {
                    dispatch({
                        type: 'LOGIN',
                        uid: result.data.data.id
                    })
                    router.push('/admin')
                }
                console.log("result", result)
            }, (err) => {
                reject(err)
                alert("Email atau Password yang anda masukkan")
            })
        })
        return promise
    }

    const handleSubmitRegister = (values) => {
        // console.log('Form data', values)
        const promise = new Promise((resolve, reject) => {
            Axios.post('http://localhost:3001/api/v1/register', {
                fullname: values.fullname,
                email: values.email,
                password: values.password,
                profpic: 'https://res.cloudinary.com/satria-img/image/upload/v1606646227/satriayud/197-1979569_no-profile_yn9cy0.png',
                status: 'active',
                isAdmin: false
            })
            .then((result) => {
                resolve(result)
                alert("Akun berhasil dibuat")
                toLoginShow()
            }, (err) => {
                reject(err)
                alert("Email already registered")
            })
        })
        return promise
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
                        <Formik initialValues={initialValuesLogin} validationSchema={validationSchemaLogin} onSubmit={(e) => handleSubmitLogin(e)}>
                            {
                                formik => {
                                    return <Form>
                                        <p className="title-login">Login</p>
                                        <FormikControl
                                        className="form-input"
                                        placeholder="Email"
                                        control='input'
                                        type='email'
                                        name='email'/>
                                        <Gap height={20} />
                                        <FormikControl
                                        className="form-input"
                                        placeholder="Password"
                                        control='input'
                                        type='password'
                                        name='password'/>
                                        <Gap height={29} />
                                        <Button title="Login" type="submit" disabled={!formik.isValid} />
                                        <p className="to-register">Don't have an account ? Click <strong className="cursor-pointer" onClick={toRegisterShow}>Here</strong></p>
                                    </Form>
                                }
                            }
                        </Formik>
                    </div>
                    
                    {/* <div className="login-wrapper">
                        <form>
                            <p className="title-login">Login</p>
                            <input className="form-input" value={emailLogin} onChange={e => setEmailLogin(e.target.value)} type="text" placeholder="Email" />
                            <Gap height={20} />
                            <input className="form-input" value={passwordLogin} onChange={e => setPasswordLogin(e.target.value)} type="password" placeholder="Password" />
                            <Gap height={29} />
                            <Button title="Login" onClick={(e) => handleSubmitLogin(e)} />
                            <p className="to-register">Don't have an account ? Click <strong className="cursor-pointer" onClick={toRegisterShow}>Here</strong></p>
                        </form>
                    </div> */}
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
                            <Formik initialValues={initialValuesRegister} validationSchema={validationSchemaRegister} onSubmit={(e) => handleSubmitRegister(e)}>
                                {
                                    formik => {
                                        return <Form>
                                            <p className="title-register">Register</p>
                                            <FormikControl
                                            className="form-input"
                                            placeholder="Email"
                                            control='input'
                                            type='email'
                                            name='email'/>
                                            <Gap height={20} />
                                            <FormikControl
                                            className="form-input"
                                            placeholder="Password"
                                            control='input'
                                            type='password'
                                            name='password'/>
                                            <Gap height={20} />
                                            <FormikControl
                                            className="form-input"
                                            placeholder="Fullname"
                                            control='input'
                                            type='text'
                                            name='fullname'/>
                                            <Gap height={29} />
                                            <Button title="Register" type="submit" disabled={!formik.isValid} />
                                            <p className="to-login">Already have an account ? Click <strong className="cursor-pointer" onClick={toLoginShow}>Here</strong></p>
                                        </Form>
                                    }
                                }
                            </Formik>
                        </div>
                    {/* <div className="register-wrapper">
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
                    </div> */}
                    </Modal.Body>
                </Modal>
        </Container>
    )
}

export default LandingGuest
