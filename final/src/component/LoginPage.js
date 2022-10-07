import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';
import HeaderPage from './HeaderPage';
import { Link } from 'react-router-dom';

const LoginPage = ({ history }) => {

    const [message, setMessage] = useState('');
    const [form, setForm] = useState({
        uid: '',
        upass: '',
        uname: ''
    });
    //object를 jsonobject로 바꾸는 방법만 알면 될듯. session에는 json type으로만 저장가능하다고 함.
    const { uid, upass, uname } = form;

    const onChange = e => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

const onSubmit = async (e) => {
    e.preventDefault();
    const result = await axios.get(`/user/read/${uid}`)
    const user = result.data;

    // alert(JSON.stringify(user, null, 4))
    //user.uid===''로 했더니 message가 안나옴. !로 붙여서 user가 있는지 살펴봐야 나오는듯.
    if (!user) {
        setMessage('아이디가 존재하지 않습니다.')
    } else if (upass !== user.upass) {
        setMessage('비밀번호가 올바르지 않습니다.')
    } else {
        alert(`환영합니다.${uid}님`)
        sessionStorage.setItem('uid', user.uid);
        sessionStorage.setItem('uname', user.uname);
        sessionStorage.setItem('photo', user.photo);
        console.log("....", sessionStorage.getItem('uname')) //session에 로그인한 값들 전부 저장. id, pass, name 등..
            history.go(-1) //window.location.href가 아니라 window.location.replace로 해야됨. 이유는 찾아봐야할 듯.
            // history.push로 들어가는게 성공하려면 HeaderPage를 모든 Page마다 달아줘야 함. insert, list 이런 component는 괜찮고, Page component에만 등록시켜놓자.
        }
    }

    return (
        <div>
            <HeaderPage />
            <Card style={{ width: '18rem', margin: '0px auto' }} className='my-10'>
                <Card.Body>
                    <Card.Title>login menu</Card.Title>
                    <Card.Text>
                        id
                    </Card.Text>
                    <Form onSubmit={onSubmit}>
                        <Form.Control
                            placeholder='uid'
                            value={uid}
                            name='uid'
                            onChange={onChange} />
                        <br />
                        <Card.Text>
                            password
                        </Card.Text>
                        <Form.Control className='mb-3' type='password'
                            placeholder='password'
                            value={upass}
                            name='upass'
                            onChange={onChange} />
                        <Button type="submit" variant="primary" style={{ margin: 26 }}>login</Button>
                        {/* button type을 적시하지 않으면 submit 기능을 하지 못함. */}
                        <Link to='/user/insert'>
                            <Button variant="secondary" style={{ margin: 26 }}>register</Button>
                        </Link>
                    </Form>
                </Card.Body>

                {message && <Alert className='px-3 text-center'>{message}</Alert>}
            </Card>
        </div>
    )
}

export default LoginPage