import React, {useState, useContext, Fragment} from 'react'
import NumberFormat from 'react-number-format'
import {AppContext} from '../../../config/Context'
import {Modal} from 'react-bootstrap'
import {useHistory} from 'react-router-dom'
import './Product.scss'
import {LogoProduct} from '../../../assets'

const Product = (props) => {
    //Context
    const [state, dispatch] = useContext(AppContext);
    console.log("status login", state.isLogin)
    //Modal
    const [loginStatus, setLoginStatus] = useState(false)

    const router = useHistory();

    const handleDetail = (id) => {
        if (state.isLogin == false) {
            setLoginStatus(true)
        }else 
            router.push(`/detail/${id}`)
            console.log("id key", props.id)
    }
    
    return (
        <Fragment>
            <div className="product-wrapper" onClick={() => handleDetail(props.id)}>
                <img className="img-product" src={props.img} alt="product waysbucks" />
                <img className="logo-product" src={LogoProduct} alt="Logo Waysbucks" />
                <p className="product-name">{props.name}</p>
                <NumberFormat value={props.price} displayType={'text'} thousandSeparator={true} prefix={'Rp, '} renderText={value => <p className="product-price">{value}</p>} />
                
            </div>
            <Modal
                    size="lg"
                    show={loginStatus}
                    onHide={() => setLoginStatus(false)}
                    centered>
                    <Modal.Body className="text-center"><p className="order-status">Please Login First Before Taking An Order</p></Modal.Body>
                </Modal>
        </Fragment>
            
    )
}

export default Product
