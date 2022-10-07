import axios from 'axios'
import React, { useEffect, useReducer, useState } from 'react'
import qs from 'qs'
import Pagination from "react-js-pagination";
import './Pagination.css';
import BoardItem from './BoardItem';
import { Col, Table,Card,Row, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

//BoardList밖에서 정의해서 한번만 실행하면 rerender해도 render안됨.
//두 번 눌러야 됨.
const reducer = (state, action) => {

    switch (action.type) {
        case 'CALL_API':
            return {
                ...state,
                list: action.payload.list,
                total: action.payload.total
            }
        default:
            return state;
    }
}

const initialState = {
    list: [],
    total: 0
}




const BoardList = ({ history, location }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const search = qs.parse(location.search, { ignoreQueryPrefix: true })
    const searchWord = search.word || ''; 
    const page = search.page || 1;
    const [word, setWord] = useState(searchWord); //usestate는 render할 때마다 바뀌는 게 아니라, mount 될 때마다 한번만 실행됨.

    const callAPI = async () => {
        const result = await axios.get(`/board/list?page=${page}&word=${searchWord}`);
        dispatch({
            type: 'CALL_API',
            payload: {
                list: result.data.list,
                total: result.data.total
            }
        })
    }
    useEffect(() => {
        setWord(searchWord); //render마다 실행시켜주려면 useEffect에서 아래와 같이 setWord를 새로 값을 넣어
        //update시켜서 render하게끔 설정해줘야 함. location에 word값이 들어가있기 때문에 가능한 방법.
        callAPI()
    }, [location])

    if (!state.list) <h1>데이터를 불러오는 중입니다.</h1>

    //page가 아니라 e를 넣음.e가 page임.
    const onChangePage = (e) => {
        history.push(`/board/list?page=${e}&word=${word}`)

    }

    const onKeyDown = (e) => {
        if (e.keyCode === 13) {
            history.push(`/board/list?page=1&word=${e.target.value}`)
        }
    }



    return (
        <div>
            <Card>
                <Row>
                    <Col md={4} xs={6}>
                        <Form.Control value={word}
                            onChange={(e) => setWord(e.target.value)}
                            placeholder='검색어' onKeyDown={onKeyDown} />
                    </Col>
                    <Col md={8} xs={12}>
                        <h4>검색수:{state.total}</h4>
                    </Col>

                </Row>
            </Card>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Title.</th>
                        <th>Writer.</th>
                        <th>Date.</th>
                    </tr>
                </thead>
                <tbody>
                    {state.list.map(board =>
                        <BoardItem key={board.bno} board={board} />)}
                </tbody>
            </Table>
            {/* Bootstrap아니라 React-js-pagination 다운해야함 */}
            <Pagination
                activePage={page}
                itemsCountPerPage={5}
                totalItemsCount={state.total}
                pageRangeDisplayed={10}
                prevPageText={"‹"}
                nextPageText={"›"}
                onChange={onChangePage} />
        </div>
    )
}

export default BoardList