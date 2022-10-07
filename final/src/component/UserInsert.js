import React, { useRef, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';


const UserInsert = ({history}) => {
  const refImage = useRef();
  const [image, setImage] = useState('/img1.png');
  const [form, setForm] = useState({
    uid:'',
    upass:'',
    uname:'',
    file: null,
    fileName: ''
  })
  const {uid, upass, uname, file, fileName} = form;
  const [message, setMessage] = useState('');
  const onChange = (e)=>{
    setForm({
      ...form,
      [e.target.name]:e.target.value
    })
  }
  const onChangeFile = (e)=>{
    setForm({
      ...form,
      file:e.target.files[0],
      fileName: e.target.value
    })
    //이미지 미리보기
    const reader = new FileReader();
    reader.onload = (e) =>{
      setImage(e.target.result);
    }
    reader.readAsDataURL(e.target.files[0]);
  }
  const onSubmit = async(e) =>{
    e.preventDefault();
    const result=await axios.get(`/user/read/${uid}`);
    const user = result.data;
    if(user) {
      setMessage('이미 사용중인 아이디 입니다.');
      return;
    }
 
    const formData = new FormData();
    formData.append("uid", uid);
    formData.append("uname", uname);
    formData.append("upass", upass);
    formData.append('file', file);
    const config = {
      headers: {'content-type':'multipart/form-data'},
    }
    await axios.post('/user/insert',formData, config);
    alert('회원이 가입되었습니다.');
    history.go(-1);
    
  }
  
  return (
    <div>
            <Card style={{ width: '28rem',margin:'0px auto',marginTop:'5rem' }}>
                <Card.Body>
                    
                    <Card.Title>Register</Card.Title>
                    <Form onSubmit={onSubmit}>
                    <Form.Control onChange={onChange} value={uid} name="uid" className='my-3' placeholder='ID'/>
                    <Form.Control onChange={onChange} value={upass} name="upass" className='my-3' type="password" placeholder='Password'/>
                    <Form.Control onChange={onChange} value={uname} name="uname" className='my-3' placeholder='User name'/>
                    <Button variant="primary" type='submit' style={{width:'100%'}}>Register</Button>
                    <img onClick={()=>refImage.current.click()} src={image} width={100}/>
                    <input type={"file"} onChange={onChangeFile} ref={refImage} style={{display:'none'}}/>
                    </Form>
                </Card.Body>
                {message &&
                <Alert className='mx-3 text-center'>{message}</Alert>
                }
            </Card>
    </div>
  )
}

export default UserInsert