import React, { useEffect, useState } from 'react'
import { Col, Table, Card, Row, Form, Badge, Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import qs from 'qs'
import axios from 'axios';
import Pagination from "react-js-pagination";
import './Pagination.css';
import UserItem from './UserItem';

const UserList = ({ history, location }) => {
    const [list, setList] = useState([]);
    const [total, setTotal] = useState(1);
    const search = qs.parse(location.search, { ignoreQueryPrefix: true });
    const searchWord = search.word || ''; //const searchWord=!search.word ? '':search.word;
    const [word, setWord] = useState(searchWord);
    const page = parseInt(search.page) || 1;
    const num = 2;

    const callAPI = async () => {
        const result = await axios.get(`/user/list?page=${page}&word=${searchWord}&num=${num}`)
        setList(result.data.list)
        setTotal(result.data.total);
    }

    //location에 page와 word값이 다 들어있어서 location이 변경될때마다로 씀.
    useEffect(() => {
        setWord(searchWord);
        callAPI()
    }, [location])

    const onChangePage = (e) => {
        history.push(`/user/list?page=${e}&word=${searchWord}`)
    }

    if (!list) <h3>데이터를 불러오는 중입니다.</h3>

    //e.target.value로 하는 이유는 searchWord는 예전 값이고, 방금 enter친 값은 e.target.value에 들어있기 때문.
    const onKeyDown = (e) => {
        if (e.keyCode === 13) {
            history.push(`/user/list?page=1&word=${e.target.value}`)
        }

    }


    return (
        <div>
            <Card className='my-3 p-2'>
                <Row>
                    <Col md={4} xs={6}>
                        <Form.Control
                            value={word}
                            onChange={(e) => setWord(e.target.value)}
                            placeholder='검색어'
                            onKeyDown={onKeyDown} />
                    </Col>
                    <Col md={8} xs={6}>
                        <Button variant="primary">
                            Count <Badge bg="danger">{total}</Badge>
                        </Button>
                    </Col>
                </Row>
            </Card>
            <Table>
                <tbody>
                    {list.map(user =>
                        <UserItem key={user.uid} user={user} />)}
                </tbody>
            </Table>

            <Pagination
                activePage={page}
                itemsCountPerPage={num}
                totalItemsCount={total}
                pageRangeDisplayed={10}
                prevPageText={"‹"}
                nextPageText={"›"}
                onChange={onChangePage}
            />
        </div>
    )
}

export default withRouter(UserList)