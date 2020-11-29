import React, {createContext, useReducer} from 'react'

export const AppContext = createContext()

const initialState = {
    isLogin: false,
    idUser: [],
    carts: 0
}

const reducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                isLogin: true,
                idUser: action.uid
            }
        case "LOGOUT":
            return {
                ...state,
                isLogin: false
            }
        case "ADD_CART":
            return {
                ...state,
                carts: state.carts + 1
        }
        case "DELETE_CART":
            return {
                ...state,
                carts: state.carts - 1
        }
        default: throw new Error()
    }
}

export const Context = (props) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <AppContext.Provider value={[state, dispatch]}>
            {props.children}
        </AppContext.Provider>
    )
}

