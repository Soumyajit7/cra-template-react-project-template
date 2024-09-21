import { createStore } from "redux";

const initialState = {
    userData: null,
    demoData: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_USER_DATA":
            return {
                ...state,
                userData: action.payload,
            };
        case "SET_DEMO_DATA":
            return {
                ...state,
                demoData: action.payload,
            };
        default:
            return state;
    }
};

export const store = createStore(reducer);
