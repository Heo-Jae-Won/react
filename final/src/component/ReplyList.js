import axios from 'axios'
import React, {useEffect, useRef, useState} from 'react'
import Form from 'react-bootstrap/Form';
import Pagination from "react-js-pagination";
import './Pagination.css';

const ReplyList = ({bno}) => {
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [content, setContent]=useState('');
  const num=5;

  const callAPI = async() => {
    const result=await axios.get(`/reply/list/${bno}?page=${page}&num=${num}`);
    setList(result.data.list);
    setTotal(result.data.total);
  }

  useEffect(()=>{
    callAPI();
  }, [page]);

  const onSubmit = async(e) => {
    e.preventDefault();
    if(content === '') {
      alert('내용을 입력해 주세요!');
      return;
    }
   const data={
      bno: bno,
      replyer: sessionStorage.getItem('uid'),
      content: content
    };
    await axios.post('/reply/insert', data);
    //로그인 안했을 시 댓글 등록 못하게 예외처리하는 방법은 어떻게 할까? 그냥 로그인 안 했으면 버튼 안보이게 막아버렸음.
    setContent('');
    callAPI();
    setPage(1);
  }

  if(!list) return <h1>Loading......</h1>
  return (
    <div>
      <Form onSubmit={onSubmit}>
        <Form.Control 
          value={content}
          onChange={(e)=>setContent(e.target.value)}
          placeholder='내용을 입력하세요...'/>
        {sessionStorage.getItem('uid') && <button type="submit">등록</button>}
      </Form>

      <hr/>
      {list.map(reply=>
        <p key={reply.rno}>[{reply.rno}] {reply.content}</p>
      )}
      <Pagination
        activePage={page}
        itemsCountPerPage={num}
        totalItemsCount={total}
        pageRangeDisplayed={10}
        prevPageText={"‹"}
        nextPageText={"›"}
        onChange={(e)=>setPage(e)}/>
    </div>
  )
}

export default ReplyList