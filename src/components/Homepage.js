import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Layout, Card } from 'antd'
import 'antd/dist/antd.css'
import Meta from 'antd/lib/card/Meta'
import {useNavigate} from "react-router-dom"
import '../App.css'

export default function Homepage (){
  const [meals, setMeals] = useState([])
  const { Content} = Layout;
  const navigate = useNavigate()

  const loadData = async () => {
  try {
    const datas = await axios.get('https://www.themealdb.com/api/json/v1/1/search.php?s=')
    setMeals(datas.data.meals)
  } catch (error){
    console.error(error)
    }
  }

  const searchBar = async (e) => {
    try {
      console.log(e.target.value)
      const datas = await axios.get('https://www.themealdb.com/api/json/v1/1/search.php?s=' + e.target.value);
      setMeals(datas.data.meals);
    } catch (error) {
      console.log(loadData);
    }
  }

  const changeCategory = async (category) => {
    try {
      const datas = await axios.get('https://www.themealdb.com/api/json/v1/1/filter.php?c=' + category);
      setMeals(datas.data.meals);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
  <Layout className="layout">
    <Content style={{ padding: '0 50px' }}>
      <div className='row title'>
        <div className='col-md-9'>
            <button onClick={() => loadData()} className="btn btn-outline-secondary btn-sm" style={{marginRight: '0.5rem'}} type="button">All Meals</button>
            <button onClick={() => changeCategory('Chicken')} className="btn btn-outline-secondary btn-sm" style={{marginRight: '0.5rem'}} type="button">Chicken</button>
            <button onClick={() => changeCategory('Seafood')} className="btn btn-outline-secondary btn-sm" style={{marginRight: '0.5rem'}}type="button">Seafood</button>
            <button onClick={() => changeCategory('Pasta')} className="btn btn-outline-secondary btn-sm" style={{marginRight: '0.5rem'}}type="button">Pasta</button>
            <button onClick={() => changeCategory('Dessert')} className="btn btn-outline-secondary btn-sm" type="button">Dessert</button>
        </div>
        <div className='col-md-3'>
          <form>
            <input 
              className="form-control me-2" 
              type="search" 
              placeholder="Search Foods" 
              aria-label="Search"
              onChange={searchBar} 
            />
          </form>
        </div>
      </div>
      <div className="site-layout-content">
        {meals !== undefined &&
          meals.map((item) => (
          <Card
            hoverable
            style={{width: 320}}
            cover={<img alt='example' src={item.strMealThumb}/>}
            onClick={() => navigate(`/${item.idMeal}`)}
          >
            <Meta title={item.strMeal} description={item.strCategory} />
          </Card>
        ))}
      </div>
    </Content>
  </Layout>
  );
}