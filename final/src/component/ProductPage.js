import React from 'react'
import { Link, Route, Switch } from 'react-router-dom'
import HeaderPage from './HeaderPage'
import ProductInsert from './ProductInsert'
import ProductList from './ProductList'

const ProductPage = () => {
    return (
        <div>
            <HeaderPage />
            <div className='sub_menu'>
                <Link to="/product/list">상품 목록</Link>
                <Link to="/product/insert">상품 등록</Link>
            </div>
            <hr/>
            <Switch>
                <Route path="/product/list" component={ProductList} />
                <Route path="/product/insert" component={ProductInsert} />
            </Switch>
        </div>
    )
}

export default ProductPage
