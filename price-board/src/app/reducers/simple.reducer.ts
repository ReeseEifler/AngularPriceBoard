import { Action } from '@ngrx/store'

import * as CommodityActions from '../actions/commodity.actions'
import { Commodity } from 'src/app/models/commodity.model'

const EDIT_START = 'EDIT_START'
const EDIT_END = 'EDIT_END'
const RANDOMIZE = 'RANDOMIZE'


//export type Action = CommodityActions.All

const getRandom = () => {
  return parseFloat((Math.random() * 100).toFixed(2))
}

const defaultState: Commodity = {
  id: 0,
  start_price: getRandom(),
  end_price: getRandom()
}



const initialCommodities = () => {
  let res = []
  for (let i = 0; i < 200; i++) {
    const start = getRandom(), end = getRandom()

    res.push({
      id: i,
      start_price: start,
      end_price: end, 
      trend: start > end ? true : false
    })
  }
  return res
}

const initialState = {
  commodities: initialCommodities()
}

// const newState = (state, newData) => {
//   return Object.assign({}, state, newData)
// }


// This is where we want the data to come from.
export function simpleReducer(state: string = 'hello world', action: Action) {
  switch (action.type) {
    case EDIT_START:
      return state = 'edit start'
    case EDIT_END:
      return state = 'edit end'
    case RANDOMIZE:
      return state = 'randomize'
    default:
      return state
  }
}
