import React, {useState, useEffect} from 'react'
import Jumbotron from '../../../assets/images/Jumbotron-login.png'
import './Content.scss'
import Product from '../../atoms/Product'

const Content = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        fetch('http://localhost:3000/products')
        .then(response => response.json())
        .then(json => {
            setProducts(json)
        })
    }, [])

    return !products ? (<h1>Loading...</h1>) : (
        <div>
            <div className="jumbotron">
                <img src={Jumbotron} alt="Jumbotron" />
            </div>  
            <p className="let-order">Let's Order</p>
            <div className="product-list">
                {
                    products.map((product) => (
                        <Product key={product.id} id={product.id} name={product.name} price={product.price} img={product.img} />
                    ))
                }
            </div>
        </div>
    )
}

export default Content
