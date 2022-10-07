import React from 'react'
import { Col, Table, Card, Row, Form } from 'react-bootstrap';
import Image from 'react-bootstrap/Image'

const UserItem = ({ user }) => {
    const { uid, uname, photo } = user;

    return (
        // 부트스트랩은 기본 12칸을 기준으로 함.
        <Card className='my-3 p-2'>
            <Row>
                {/* lg는 크게해주는 것이고, 이것을 통해 비율이 정해져서 반응형 쌉가능 */}
                <Col lg={2}>
                    {!photo ? <Image src="/img1.png" fluid={true} style={{ width: 100 }} /> :
                        <Image src={`/display?fileName=${photo}`} fluid={true} style={{ width: 100 }} />}
                </Col>
                <Col lg={10}>
                    <h4>{uid}</h4>
                    <h4>{uname}</h4>
                </Col>
            </Row>
        </Card>
    )
}

export default UserItem