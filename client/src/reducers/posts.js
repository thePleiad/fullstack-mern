import ACTIONS from '../constants/actionTypes'

export default (state = { isLoading: true, posts: [] }, action) => {
    switch(action.type) {
        case ACTIONS.START_LOADING:
        return { ...state, isLoading: true };
        case ACTIONS.END_LOADING:
        return { ...state, isLoading: false };
        case ACTIONS.COMMENT:
        return {
            ...state,
            posts: state.posts.map((post) => {
            if (post._id === action.payload._id) {
                return action.payload;
            }
            return post;
            }),
        };
        case ACTIONS.FETCH_ALL:
        return {
            ...state,
            posts: action.payload.data,
            currentPage: action.payload.currentPage,
            numberOfPages: action.payload.numberOfPages,
        };
        case ACTIONS.FETCH_BY_SEARCH:
        return { ...state, posts: action.payload.data };
        case ACTIONS.FETCH_POST:
        return { ...state, post: action.payload.post };
        case ACTIONS.LIKE:
        return { ...state, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)) };
        case ACTIONS.CREATE:
        return { ...state, posts: [...state.posts, action.payload] };
        case ACTIONS.UPDATE:
        return { ...state, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)) };
        case ACTIONS.DELETE:
        return { ...state, posts: state.posts.filter((post) => post._id !== action.payload) };
        default:
        return state;
    }
}