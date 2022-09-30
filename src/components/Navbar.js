import 'antd/dist/antd.css'
import { Header } from 'antd/lib/layout/layout'
import React from 'react'

export default function Navbar (){
  
  return (
    <Header style={{height: '80px'}}>
      <div className='container navbar' style={{ justifyContent: "center"}}>
        <p>FOOD RECIPE GALLERY</p>
      </div>
    </Header>
  )
}