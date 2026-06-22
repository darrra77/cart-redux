import {useDispatch, useSelector} from 'react-redux'
import {
    addItem,
    decrementCount,
    incrementCount,
    MAX_COUNT,
    MIN_COUNT,
} from './store/cartSlice'
import './App.css'

function App() {
    const items = useSelector((state) => state.cart)
    const dispatch = useDispatch()

    const handleAdd = () => {
        const title = window.prompt('Название товара:')
        if (title !== null) {
            dispatch(addItem(title))
        }
    }

    return (
        <div className="app">
            <header className="app__header">
                <h1 className="app__title">Корзина</h1>
                <button type="button" className="app__add" onClick={handleAdd}>
                    Добавить товар
                </button>
            </header>
            <p className="app__hint">
                Количество от {MIN_COUNT} до {MAX_COUNT}. Товары которых меньше 1 удаляются из корзины.
            </p>
            <ul className="cart">
                {items.map((item) => (
                    <li key={item.id} className="cart__row">
                        <span className="cart__title">{item.title}</span>
                        <span className="cart__controls">
              <button
                  type="button"
                  className="cart__btn"
                  aria-label={`Увеличить количество: ${item.title}`}
                  onClick={() => dispatch(incrementCount(item.id))}
                  disabled={item.count >= MAX_COUNT}
              >
                +
              </button>
              <span className="cart__count" aria-live="polite">
                {item.count}
              </span>
              <button
                  type="button"
                  className="cart__btn"
                  aria-label={`Уменьшить количество: ${item.title}`}
                  onClick={() => dispatch(decrementCount(item.id))}
              >
                −
              </button>
            </span>
                    </li>
                ))}
            </ul>
            {items.length === 0 && (
                <p className="cart__empty">Корзина пуста</p>
            )}
        </div>
    )
}

export default App
