import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Card, Col, Row } from 'react-bootstrap';
import ProductItem from './ProductItem';
import qs from 'qs'
import Pagination from 'react-js-pagination';

const ProductList = ({ location, history }) => {
    const [list, setList] = useState([]);
    const [total, setTotal] = useState(1);
    const [word, setWord] = useState('');
    const search = qs.parse(location.search, { ignoreQueryPrefix: true })
    // location에 있는 것은 query string이라서 숫자도 string취급됨. 그래서 parseInt를 주어야 함.근데 JS를 믿으니까 한번 안해보겠음 ㅇㅇ. 근데도 됨. 별상관없음.
    const page = search.page || 1;
    const searchWord = search.word || '';
    const num = 3;

    const callAPI = async () => {
        const result = await axios.get(`/product/list?page=${page}&word=${searchWord}&num=${num}`);
        setList(result.data.list);
        setTotal(result.data.total);
    }

    const onKeyDown = (e) => {
        if (e.keyCode === 13) {
            // history.push로 해당 위치로 이동하게 되면, useEffect의 deps location과 연동되어서 다시 re-render가 일어남. 그래서 callAPI가 일어나고 검색이 가능해짐.  다만 searchWord로 하면 안됨. 그건 옛날 거기 때문. 이미지 name="old"랑
            //같다고 생각하면 됨. 따라서 현재 입력한 값인 e.target.value를 적어줌.
            history.push(`/product/list?page=1&word=${e.target.value}&num=${num}`)
        }
    }
    const onChangePage = (e) => {
        //여기는 e.target.value가 아니라 검색된 이후 다시 페이징을 하는거라 옛날 word인 searchWord를 들고가는것. 그리고 이렇게 하면 useEffect에서 stWord에 searchWord를 넣어줘서 강제 re-render를 해줌.
        history.push(`/product/list?page=${e}&word=${searchWord}&num=${num}`)
    }

    useEffect(() => {
        //setWord와 callAPI는 순서를 바꾸면 안됨.
        setWord(searchWord);
        callAPI();
        console.log("...")
    }, [location])

    if (!list) <h3>데이터를 불러오는 중입니다.</h3>
    return (
        <div>
            <input placeholder='검색어'
                onKeyDown={onKeyDown}
                onChange={(e) => setWord(e.target.value)}>
            </input>
            <Card className='my-3' >

                <Row>
                    <Col style={{ width: '18rem' }}>
                        상품번호
                    </Col>
                    <Col>
                        상품이름
                    </Col>
                    <Col>
                        가격
                    </Col>
                    <Col>
                        이미지
                    </Col>
                    <Col>
                        날짜
                    </Col>
                </Row>
                <hr />
                <br />
                {list.map(p =>
                    <ProductItem key={p.pcode}
                        product={p}
                    />

                )}
            </Card>
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

export default ProductList
