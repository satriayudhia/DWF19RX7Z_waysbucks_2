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
    const [image, setImage] = useState('')

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

    const uploadImage = async e => {
        const files = e.target.files
        const data = new FormData()
        data.append('file', files[0])
        data.append('upload_preset', 'satriayud')
        // setLoading(true)
        const res = await fetch(
            'https://api.cloudinary.com/v1_1/satria-img/image/upload',
            {
                method: 'POST',
                body: data
            }
        )
        const file = await res.json()
        setImage(file.secure_url)
        // setLoading(false)
        console.log("result user id", user.id)
        axios({
            method: 'patch',
            url: `http://localhost:3000/users/${user.id}`,
            data: {
                profpic: file.secure_url
            }
        })
    }

    return (
        <Container fluid>
            <HeaderLogin/>
            <Row className="top-profile">
                <Col className="my-profile">My Profile</Col>
                <Col className="my-transaction">My Transaction</Col>
            </Row>
            <Row className="content-profile">
                <Col sm={2}>
                    <input id="upload-img" onChange={uploadImage} className="file-input-img" type="file" placeholder="Photo Product"/>
                    <label for="upload-img">
                        <img className="profpic" src={image} alt="Profile Picture" />
                    </label>
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
