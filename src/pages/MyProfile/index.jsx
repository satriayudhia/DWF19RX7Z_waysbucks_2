import React, {useEffect, useContext, useState} from 'react'
import {AppContext} from '../../config/Context'
import axios from 'axios'
import './MyProfile.scss'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import HeaderLogin from '../../components/molecules/HeaderLogin'
import Gap from '../../components/atoms/Gap'
import ProductTrans from '../../components/atoms/ProductTransaction'
import Logo from '../../assets/logos/logoProduct.png'
import QR from '../../assets/logos/qr-code.png'

const MyProfile = () => {
    const [state] = useContext(AppContext);
    const [user, setUser] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:3000/users/${state.idUser}`)
            .then(function (response) {
                // handle success
                setUser(response.data)
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }, [])

    return (
        <Container fluid>
            <HeaderLogin/>
            <Row className="top-profile">
                <Col className="my-profile">My Profile</Col>
                <Col className="my-transaction">My Transaction</Col>
            </Row>
            <Row className="content-profile">
                <Col sm={2}>
                    <img className="profpic" src="https://s3-alpha-sig.figma.com/img/5736/4ad6/6ebf751e7f102311d3ba8137ef22382a?Expires=1607299200&Signature=QQrPC5JP-QJaAlY1uI3D6y18mLnCVQzFyl~vG~pQ3PX4-l-p8ygi4pcnaQNdhE1wICmViRKiZt6d5z-IgWhYb8aozUj0Slmfxmldn1sgAZ4kHpGPYkAr3GsxgBS6vKT3B6mW4jdbvBECpbt6vxctuWGnTmG2trWAcHK~AcxQzIyVs4O6~KgNjcWmkiVpP3lRkKwj5EJShFKazrb6fTmZcqeATLAwDoM1Mt~ivUMguQJCslrlO7IjYRAbFVyjnPDtzDPvniIPTRvbVK2m7GIO6lR6scxFfLH5rRhP6prYMsZFJxem2UzmkLo~HkcCdT2x-r5ktGLfSNlB-Fh3Vhuv5w__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA" alt="Profile Picture" />
                </Col>
                <Col className="profile-detail" sm={4}>
                    <Row className="brown-text">Fullname</Row>
                    <Row className="black-text">{user.name}</Row>
                    <Gap height={27} />
                    <Row className="brown-text">Email</Row>
                    <Row className="black-text">{user.email}</Row>
                </Col>
                <Col sm={5} className="my-trans-wrapper">
                    <Row>
                        <Col>
                            <ProductTrans/>
                            <ProductTrans/>
                        </Col>
                        <Col sm={3}>
                            <Row><img className="logo-trans-qr" src={Logo} alt="logo waysbucks" /></Row>
                            <Row><img className="qr-trans" src={QR} alt="QR Code" /></Row>
                            <Row className="qr-otw">On The Way</Row>
                            <Row className="qr-price">Sub Total : 69.000</Row>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}

export default MyProfile
