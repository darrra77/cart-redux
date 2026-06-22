import { createSlice } from '@reduxjs/toolkit'
import { defaultState } from './defaultState'

const MIN_COUNT = 1
const MAX_COUNT = 25

function nextId(items) {
    if (items.length === 0) return 1
    return Math.max(...items.map((i) => i.id)) + 1
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: defaultState,
    reducers: {
        incrementCount(state, action) {
            const item = state.find((i) => i.id === action.payload)
            if (item && item.count < MAX_COUNT) {
                item.count += 1
            }
        },
        decrementCount(state, action) {
            const id = action.payload
            const index = state.findIndex((i) => i.id === id)
            if (index === -1) return
            const item = state[index]
            if (item.count > MIN_COUNT) {
                item.count -= 1
            } else {
                state.splice(index, 1)
            }
        },
        addItem(state, action) {
            const title = action.payload?.trim()
            if (!title) return
            state.push({
                id: nextId(state),
                title,
                count: MIN_COUNT,
            })
        },
    },
})

export const { incrementCount, decrementCount, addItem } = cartSlice.actions
export { MIN_COUNT, MAX_COUNT }
export default cartSlice.reducer
