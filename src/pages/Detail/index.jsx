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
    const [topingPrice, setTopingPrice] = useState([])
    const [total, setTotal] = useState(0)

    //UserId
    const [user, setUser] = useState("")

    // const [total, setTotal] = useState("")

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
            // setTotal(product.price)
            // console.log("total", total)
        )
    }, [])

    useEffect(() => {
            let priceList = topingPrice.map((prices) => parseInt(prices.price))
            let sum = priceList.reduce((a,b) => a + b, 0)
            let sumTotal = product.price + sum
            setTotal(sumTotal)
            // console.log("pricelist", priceList)
            // console.log("total", sum)
    }, [topingPrice])

    const router = useHistory()

    const handleTotal = (price, id, name) => {
        let x = document.getElementById(name).checked
        console.log("x", x)
        if(x) {
            const changeData = topingPrice.concat({id: id, price: price})
            return setTopingPrice(changeData)
        } else {
            let newArray = topingPrice.filter( (item) => {
                if(item.id !== id){
                     return item;
                }
           });
            setTopingPrice(newArray)
        }
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
        dispatch({
            type: "ADD_CART"
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
                            topings.map((toping, index) => (
                                <div className="toping-wrapper">
                                    <div className="round">
                                         <label for={toping.name}>
                                            <img className="img-toping" src={toping.img} alt="toping" />
                                        </label>
                                        <input onChange={() => handleTotal(toping.price, toping.id, toping.name)} value={toping.price} type="checkbox" id={toping.name} />
                                        <label className="label-checkbox" for={toping.name}></label>
                                    </div>
                                    <div className="title-toping-wrapper">
                                        <p className="title-toping">{toping.price}</p>
                                        <p className="title-toping">{toping.name}</p>
                                    </div>
                                </div>
                            ))
                        }
                    </Row>
                    <Row className="total-product">
                        <Col><p>Total</p></Col>
                        <Col><p>{!total ? product.price : total}</p></Col>
                    </Row>
                    <Row>
                        <Button onClick={() => toCart(product.id)} className="btn-add-cart" title="Add Cart" />
                    </Row>
                </Col>
            </Row>
            <pre>{JSON.stringify(topingPrice, null, 2)}</pre>
        </Container>
    )
}

export default Detail
