import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const HeaderPage = () => {
    const [uid, setUid] = useState(null);
    const [uname,setUname]=useState(null);
    const onLogout=()=>{
      sessionStorage.removeItem('uid')
      sessionStorage.removeItem('uname')
      sessionStorage.removeItem('photo')
    }
    //user정보가 바뀔 때마다 render시키면서 session값을 꺼냄.
    useEffect(() => {
      setUid(sessionStorage.getItem('uid'));
      setUname(sessionStorage.getItem('uname'));
     
      console.log(uid)
    }, [uid])

  return (
    <div>
         <div className='main_menu'>
        <Link to="/">Home</Link>
        <Link to="/board/list">Board</Link>
        <Link to="/user/list">User</Link>
        <Link to="/product/list">Product</Link>
        {/* session에 저장된 id가 있다면, 즉 로그인한 id가 있다면 로그아웃이 뜨고, 로그인한 아이디가 없어 session에 user값이 없다면 로그인을 띄움. */}
        {!uid ? <Link to="/login" style={{ float: 'right' }}>Login</Link> :
        <>
        <span>{uname}({uid})</span>
          <a href="/" onClick={onLogout} style={{ float: 'right' }}>Logout</a>
          </>}
         
        <hr />
      </div>
    
    </div>
  )
}

export default HeaderPage