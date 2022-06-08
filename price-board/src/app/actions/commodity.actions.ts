import { createAction, props } from '@ngrx/store'

export const RANDOMIZE = '[Commodity] Randomize'
export const LOAD_DATA = '[Commodity] Load Data'
export const POPULATE = '[Commodity] Populate'
export const UPDATE_ROW = '[Commodity] Update Row'

export const Populate = createAction(
    POPULATE,
    props<{commodities: Array<any>}>()
)

export const UpdateRow = createAction(
    UPDATE_ROW,
    props<{id: number, start_price: number, end_price: number}>()
)

export const Randomize = createAction(
    RANDOMIZE,
    props<{id: number, start_price: number, end_price: number}>()
)