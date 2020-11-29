import React, {useContext, useEffect, useState} from 'react'
import {AppContext} from '../../../config/Context'
import axios from 'axios'
import {useHistory} from 'react-router-dom'
import './ProductCart.scss'
import Logo from '../../../assets/logos/logoProduct.png'
import Bin from '../../../assets/logos/bin.png'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const ProductCart = (props) => {
    //Context
    const [state] = useContext(AppContext);
    const [idTransaction, setIdTransaction] = useState('')

    const router = useHistory()

    // useEffect(() => {
    //     axios.get(`http://localhost:3000/transactions?idUser=${state.idUser}`)
    //     .then(function (response) {
    //         // handle success
    //         console.log('hasil response', response.data);
    //         setIdTransaction(response.data)
    //     })
    //     .catch(function (error) {
    //         // handle error
    //         console.log(error);
    //     })
    // }, [])

    const deleteCart = (id) => {
        axios.delete(`http://localhost:3000/transactions/${id}`)
        .then(function (response) {
            router.push("/cart")
        })
        .catch(function (error) {
            console.log(error);
        })
    }

    return (
        <Container>
            <Row>
                <Col sm={2} className="cart-img-wrapper">
                    <img className="cart-img" src={props.img} alt="Image Coffe"/>
                    <img className="cart-logo" src={Logo} alt="logo dumbways"/>
                </Col>
                <Col sm={7} className="cart-product-wrapper">
                    <Row>
                        <Col><p className="cart-product-name">{props.name}</p></Col>
                    </Row>
                    <Row>
                        <Col><p className="cart-toping-name">Toping : Bill Berry Boba, Bubble Tea Gelatin</p></Col>
                    </Row>
                </Col>
                <Col sm={3} className="cart-price-wrapper">
                    <Row>
                        <Col><p>Rp, {props.price}</p></Col>
                    </Row>
                    <Row>
                        <Col><img onClick={() => deleteCart(props.idTransaction)} className="remove-bin" src={Bin} alt="Hapus"/></Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}

export default ProductCart
