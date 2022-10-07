import React from 'react'
import { Card, Col, Row } from 'react-bootstrap';

const ProductItem = ({ product }) => {
    const { pcode, pname, price, image, pdate } = product;

    return (
       
            <Row>
                <Col >
                    <h3>{pcode}</h3>
                </Col>
                <Col >
                    <h3> {pname}</h3>
                </Col>
                <Col>
                    <h3> {price}</h3>
                </Col>
                <Col>
                    {image && <h3> <img src={`/display?fileName=${image}`} width={100} alt="빈이미지" /></h3>}
                    {!image && <h3> <img src="https://dummyimage.com/150x120/" width={100} alt="빈이미지" /></h3>}
                </Col><Col>
                    <h3> {pdate}</h3>
                </Col>
            </Row>
    
    )
}

export default ProductItem
