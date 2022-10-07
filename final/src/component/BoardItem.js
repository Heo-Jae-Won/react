import React from 'react'
import { Link } from 'react-router-dom';

const BoardItem = ({ board }) => {
    const { bno, title, content,writer, regDate, uname } = board;
    return (
        <>
            <tr>
                <Link to={{pathname:`/board/read/${bno}`,
                state:{
                    board:board
                }}}><td>{bno}</td></Link>
                <td>{title}</td>
                <td>{writer}</td>
                <td>{regDate}</td>
                <td>{uname}</td>
                
                </tr></>
    )
}

export default BoardItem