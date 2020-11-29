import React from 'react'
import './ProductTransaction.scss'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Logo from '../../../assets/logos/logoProduct.png'
import Gap from '../../atoms/Gap'

const ProductTransaction = () => {
    return (
        <Container>
            <Row>
                <Col sm={3} className="img-trans-wrapper">
                    <img className="product-trans" src="https://s3-alpha-sig.figma.com/img/4348/8c71/4273019eb029d3a34583371f7000ecba?Expires=1607299200&Signature=MHgd2V8TP9FK0In3Ik199anJJq37eTgSr5W7BrsZ2FB1e5cQuvzH0x85TproA8FPfQI-Jf7~5J1Q-UJCPnuppzSy5WTnkHn4ghB8Cwh-lzvkmlL1YANOxTs33Mqq5CzCAHgBtNEdrNzLdOxfc4QdyzLXTnhVTZkTIaB38XrwwWsMMDij0Y6IWF-RCuNn7CODZI~SX3-uVyjdx~jknE6Ma-ca16xcJ57C5pHbrV5BKz4jWkxMP2u32VUrSnVVDGpG2a2Rw7EC-pFbOX~nu8zQ4lvODW7lo2EkDyE-umnHIRAH2Dumv5XeIFkrxQphl7sKFcooNGrl7jN6DhYpnVWwLw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA" alt="Coffe Image"/>
                    <img className="logo-trans" src={Logo} alt="logo waysbucks"/>
                </Col>
                <Col sm={9} className="detail-trans">
                    <Row className="title-trans">Ice Coffe Palm Sugar</Row>
                    <Row className="date-trans"><strong>Saturday</strong>, 5 March 2020</Row>
                    <Gap height={14} />
                    <Row><span className="brown-txt">Toping</span><span className="red-txt"> : Bill Berry Boba, Buble Tea Gelatin</span></Row>
                    <Row className="brown-txt">Price : Rp. 33.000</Row>
                </Col>
            </Row>
        </Container>
    )
}

export default ProductTransaction
