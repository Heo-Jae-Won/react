import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import ReplyList from './ReplyList';

const BoardRead = ({ location, history, match }) => {
  const board = location.state.board;
  const bno = match.params.bno;

  const onClickDelete=async()=>{
    await axios.post(`/board/delete/${bno}`)
    history.go(-1)
  }

  return (
    <div>
      <h3>{board.title}</h3>
      <h3>{board.uname}:({board.writer})</h3>
      <h4>{board.regDate}</h4>
      <h4>{board.updatedate}</h4>
      <p>{board.content}</p>
      <hr/>
      {/* 댓글정보는 bno가 필요하기 때문에 bno를 가져가야 함. */}
      <ReplyList bno={bno}/>
      {sessionStorage.getItem('uid')===board.writer &&
      <>
      <Link to={`/board/update/${bno}`}><button className='grayButton'>수정</button></Link>
      <button className='grayButton'
      onClick={onClickDelete} >삭제</button></>}
      
      <button onClick={() => { history.go(-1) }}>목록</button>
    </div>
  )
}



export default BoardRead