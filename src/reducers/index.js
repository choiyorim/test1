import { combineReducers } from 'redux';
import sign from "./SignReducer";


const extra = (state = { value: 'this_is_extra_reducer' }, action) => {
    switch(action.type) {
        default:
            return state;
    }
};

const reducers = combineReducers({
    sign,

});

export default reducers;