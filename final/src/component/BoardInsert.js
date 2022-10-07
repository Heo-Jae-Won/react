import axios from 'axios';
import React, { useReducer, useRef, useState } from 'react'


const BoardInsert = ({ history }) => {
    const refTItle = useRef();

    const [form, setForm] = useState({
        title: '',
        content: '',
        writer: sessionStorage.getItem('uid'),

    });
    const { title, content } = form;
    const onChangeForm = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    const onSubmit = async () => {
        if (title === '') {
            alert('제목을 입력해주세요');
            refTItle.current.focus();
            return;
        }
        await axios.post('/board/insert', form);
        history.push('/board/list');
    }
    return (
        <div>
            <input
                value={title}
                onChange={onChangeForm}
                name='title'
                placeholder='Title' size={70} ref={refTItle} />
            <br /><br />
            <textarea
                value={content}
                onChange={onChangeForm}
                name='content'
                placeholder='Content' rows={10} cols={80} />
            <br />
            <button onClick={onSubmit}>Register</button>
            <button>Reset</button>
        </div>
    )
}

export default BoardInsert