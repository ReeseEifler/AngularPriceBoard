import { Commodity } from 'src/app/models/commodity.model'

interface PriceBoard {
    commodities: Array<Commodity>
}

export const getInitialData = () => {
    return getCommodities()
    .then(commodities => ({commodities}))
}

// ?! - How do we use getCommodities to bring this data into the commodities list?
const getCommodities = async () => {
    return fetch('/_DATA.json')
    .then(res => res.json())
    .then(res => res as PriceBoard)
}