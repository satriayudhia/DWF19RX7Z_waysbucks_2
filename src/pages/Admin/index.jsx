import React, {useState, useEffect} from 'react'
import './Admin.scss'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import HeaderAdmin from '../../components/molecules/HeaderAdmin'

const Admin = () => {
    const [transactions, setTransactions] = useState([])

    useEffect(() => {
        fetch('http://localhost:3000/incomes')
        .then(response => response.json())
        .then(json => {
            setTransactions(json)
        })
    }, [])

    return !transactions ? (<h1>Loading...</h1>) : (
        <Container fluid>
            <HeaderAdmin/>
            <Row className="admin-title">Income Transaction</Row>
            <Row className="admin-wrapper" >
                <Col className="border">No</Col>
                <Col className="border">Name</Col>
                <Col className="border">Address</Col>
                <Col className="border">Pos Code</Col>
                <Col className="border">Income</Col>
                <Col className="border">Status</Col>
                <Col className="border">Action</Col>
            </Row>
            {
                transactions.map((transaction) => (
                    <Row className="admin-data-wrapper" key={transaction.id}>
                        <Col className="border-data">{transaction.id}</Col>
                        <Col className="border-data">{transaction.name}</Col>
                        <Col className="border-data">{transaction.address}</Col>
                        <Col className="border-data">{transaction.posCode}</Col>
                        <Col className="border-data">{transaction.income}</Col>
                        <Col className="border-data">{transaction.status}</Col>
                        <Col className="border-data">{transaction.action}</Col>
                    </Row>
                ))
            }
        </Container>
    )
}

export default Admin
