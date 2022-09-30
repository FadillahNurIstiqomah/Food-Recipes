import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {useParams} from "react-router-dom"
import {Layout} from 'antd'
import '../App.css'
import Navbar from './Navbar'

export default function Details(){
  const {Footer} = Layout;
  const [ingredients, setIngredients] = useState([])
  let {id} = useParams()
  const [state, setState] = useState(null)

  const loadData = async () => {
    const res = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    let data = res.data.meals[0]
    setState(data)
    
    let showIngredients = []
    for (let i = 0; i <= 20; i++) {
      if (data[`strIngredient${i}`]) {
        showIngredients.push([data[`strIngredient${i}`], data[`strMeasure${i}`]])
      }
    }
    setIngredients(showIngredients)
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <Navbar/>
      {state &&
        <div className='row details'>
          <div className='col-md-4'>
            <img src={state.strMealThumb} style={{width: '100%'}} alt=''></img>
          </div>
          <div className='col-md-8 p-3'>
            <div className='card p-3'>
              <h2><strong>{state.strMeal}</strong></h2>
              <h5><strong>Ingredients</strong></h5>
              <div>
                {
                  ingredients.map((ingredient, i) => {
                    return (
                      <p key={i}>{ingredient[1]} {ingredient[0]}</p>
                    )
                  })
                }
              </div>
              <h5><strong>Area</strong></h5>
              <p>{state.strArea}</p>
              <h5><strong>Instructions</strong></h5>
              <p style={{alignContent: 'justify'}}>{state.strInstructions}</p>
            </div>
          </div>
        </div>}
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
    </div>
  );
}


