import { createAction, props } from '@ngrx/store'

export const EDIT_START = '[Commodity] EditStart'
export const EDIT_END = '[Commodity] EditEnd'
export const RANDOMIZE = '[Commodity] Randomize'
export const LOAD_DATA = '[Commodity] Load Data'
export const POPULATE = '[Commodity] Populate'
export const UPDATE_ROW = '[Commodity] Update Row'

export const Populate = createAction(
    POPULATE,
    props<{commodities: Array<any>}>()
)

export const EditStart = createAction(
    EDIT_START,
    props<{id: number, start_price: number}>()
)

export const EditEnd = createAction(
    EDIT_END,
    props<{id: number, end_price: number}>()
)

export const UpdateRow = createAction(
    UPDATE_ROW,
    props<{id: number, start_price: number, end_price: number}>()
)

export const Randomize = createAction(
    RANDOMIZE,
    props<{id: number, start_price: number, end_price: number}>()
)