import React, {useState, useEffect, useContext} from 'react'
import {AppContext} from '../../config/Context'
import {useHistory} from 'react-router-dom'
import axios from 'axios'
import NumberFormat from 'react-number-format'
import xtype from 'xtypejs'
import './Detail.scss'
import HeaderLogin from '../../components/molecules/HeaderLogin'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import LogoProduct from '../../assets/logos/logoProduct.png'
import Toping from '../../components/atoms/Toping'
import Button from '../../components/atoms/Button'

const Detail = (props) => {
    //Context
    const [state, dispatch] = useContext(AppContext);
    
    // const {id} = props.match.params.id
    const [topings, setTopings] = useState([])
    const [product, setProduct] = useState({})

    //UserId
    const [user, setUser] = useState("")

    const [total, setTotal] = useState("")

    useEffect(() => {
        fetch('http://localhost:3000/topings')
        .then(response => response.json())
        .then(json => {
            setTopings(json)
        })
    }, [])

    useEffect(() => {
        let id = props.match.params.id;
        console.log("nilai props", props)
        fetch(`http://localhost:3000/products/${id}`)
        .then(response => response.json())
        .then(json => {
            setProduct(json)
        })
        .then(
            setTotal(product.price),
            console.log("total", total)
        )
    }, [])

    const router = useHistory()

    const sumTotal = (top) => {
        const topNumber = parseInt(top)
        setTotal(product.price + topNumber)
    }

    const toCart = () => {
        let timestamp = new Date().getTime()
        axios({
            method: 'post',
            url: 'http://localhost:3000/transactions',
            data: {
                id: timestamp,
                idUser: state.idUser,
                idProduct: product.id,
                nameProduct: product.name,
                imgProduct: product.img,
                topings: [],
                price: product.price
            }
          })
        router.push("/cart")
    }

    return !topings && !product ? (<h1>Loading...</h1>) : (
        <Container fluid>
            <HeaderLogin/>
            <Row>
                <Col sm={5} className="image-product-wrapper">
                    <img className="img-product-detail" src={product.img} alt="Ice Coffe Palm Sugar" />
                    <img className="logo-product-detail" src={LogoProduct} alt="logo waysbucks" />
                </Col>
                <Col sm={7} className="detail-product-wrapper">
                    <Row className="product-title-detail">
                        <p>{product.name}</p>
                    </Row>
                    <Row className="product-price-detail">
                    <NumberFormat value={product.price} displayType={'text'} thousandSeparator={true} prefix={'Rp, '} renderText={value => <p>{value}</p>} />
                        
                    </Row>
                    <Row className="product-toping-detail">
                        <p>Toping</p>
                    </Row>
                    <Row className="product-toping-list">
                        {
                            topings.map((toping) => (
                                <div className="toping-wrapper">
                                    <div className="round">
                                         <label for={toping.name}>
                                            <img className="img-toping" src={toping.img} alt="toping" />
                                        </label>
                                        <input type="checkbox" id={toping.name} />
                                        <label className="label-checkbox" for={toping.name}></label>
                                    </div>
                                    <div className="title-toping-wrapper">
                                        <p className="title-toping">{toping.name}</p>
                                    </div>
                                </div>
                            ))
                        }
                    </Row>
                    <Row className="total-product">
                        <Col><p>Total</p></Col>
                        <Col><p>{product.price}</p></Col>
                    </Row>
                    <Row>
                        <Button onClick={() => toCart(product.id)} className="btn-add-cart" title="Add Cart" />
                    </Row>
                </Col>
            </Row>
            <pre>{JSON.stringify(state, null, 2)}</pre>
        </Container>
    )
}

export default Detail
