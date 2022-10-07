import axios from 'axios';
import React, { useEffect, useState } from 'react'

const BoardUpdate = ({ match, history }) => {
    const bno = match.params.bno;
    //useState변수에 초기값은 반드시 필수적으로 넣기.
    const [board, setBoard] = useState([]);

    const callAPI = async () => {
        const result = await axios.get(`/board/read/${bno}`)
        setBoard(result.data);
    }

    const onChangeForm = (e) => {
        setBoard({
            ...board,
            [e.target.name]: e.target.value
        })
    }

    if(!board)<h3>데이터를 불러오는 중입니다.</h3>

    const onSubmit = async () => {
        if (!window.confirm('수정하시겠습니까?')) return;
        await axios.post(`/board/update`, board);
        history.go(-2)
    }

    useEffect(() => {
        callAPI()
    }, [])

    return (
        <div>
            <input
                onChange={onChangeForm}
                value={board.title}
                name='title'
                placeholder='title'
                size={80}
            />
            <hr />
            <textarea
                onChange={onChangeForm}
                value={board.content}
                name="content"
                placeholder='content'
                rows={10} cols={80} />
            <button onClick={onSubmit}>수정하기</button>
        </div>
    )
}

export default BoardUpdate