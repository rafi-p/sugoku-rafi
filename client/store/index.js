import { createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
const baseURL = 'https://sugoku.herokuapp.com'

const initialState = {
    data: [],
    input: [],
    loading: false,
    status: '',
    loadingButton: false,
    solveBoard: [],
    name: '',
    difficulty: '',
    visible: false,
    errText: ''
}

export const fetchBoard = (difficulty) => {
    return (dispatch) => {
        dispatch ({ type: 'SET_LOADING', payload: true })
        fetch(`${baseURL}/board?difficulty=${difficulty}`,{
            method: 'GET'
        })
        .then(res => {
            if(res.ok) {
            return res.json()
            } else {
            return Promise.reject({
                status: res.status,
                statusText: res.statusText
            })
            }
        })
        .then(data => {

            const inputBoard = data.board.map(el => {
                return el.map(ell => {
                  return ell
                })
              })

            const newArrBoard = data.board.map(el => {
                return el.map(ell => {
                return ell
                })
            })
            dispatch ({ type: 'SET_DATA_BOARDS', payload: data.board, newArrBoard: newArrBoard, inputBoard: inputBoard})
            dispatch ({ type: 'SET_STATUS', payload: '' })
        })
        .catch(error => {
            console.error('Error:', error)
        })
        .finally(() => {
            dispatch ({ type: 'SET_LOADING', payload: false })
        })
    }

  }

  export const validateBoard = (finalBoard, navigation, name) => {
    return (dispatch) => {
        dispatch ({ type: 'SET_LOADING_BUTTON', payload: true })

        fetch(`${baseURL}/validate`,{
          method: 'POST',
          body: finalBoard,
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
        .then(res => {
          if(res.ok) {
            return res.json()
          } else {
            return Promise.reject({
              status: res.status,
              statusText: res.statusText
            })
          }
        })
        .then(data => {

            dispatch ({ type: 'SET_STATUS', payload: data.status })

          if(data.status === 'unsolved') {

            dispatch ({ type: 'SET_VISIBLE', payload: true })
            dispatch ({ type: 'SET_ERROR_TEXT', payload: 'Please fill all the empty number!' })

          } else if (data.status === 'broken') {

            dispatch ({ type: 'SET_VISIBLE', payload: true })
            dispatch ({ type: 'SET_ERROR_TEXT', payload: 'Some number are incorrect' })
          } else if (data.status === 'solved') {
            navigation.navigate('Finish', {
              name: name
            })
          }
        })
        .catch(error => {
          console.error('Error:', error)
        })
        .finally(() => {
            dispatch ({ type: 'SET_LOADING_BUTTON', payload: false })
        })
    }
  }

  export const solveGame = (startBoard) => {
    return (dispatch) => {

          dispatch ({ type: 'SET_LOADING_BUTTON', payload: true })

          fetch(`${baseURL}/solve`,{
            method: 'POST',
            body: startBoard,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
          })
          .then(res => {
            if(res.ok) {
              return res.json()
            } else {
              return Promise.reject({
                status: res.status,
                statusText: res.statusText
              })
            }
          })
          .then(data => {
            console.log(data)

            dispatch ({ type: 'SET_STATUS', payload: data.status })
            dispatch ({ type: 'SET_DATA_BOARDS', payload: data.solution })
          })
          .catch(error => {
            console.error('Error:', error)
          })
          .finally(() => {
            dispatch ({ type: 'SET_LOADING_BUTTON', payload: false })
          })
    }
  }

function reducer(state = initialState, action ) {
    switch (action.type ) {
        case 'SET_DATA_BOARDS':
            return { ...state, data: action.payload, input: action.inputBoard, solveBoard: action.newArrBoard}
        case 'SET_NEW_INPUT':
            return { ...state, input: action.payload}
        case 'SET_LOADING':
            return { ...state, loading: action.payload}
        case 'SET_STATUS':
            return { ...state, status: action.payload}
        case 'SET_NAME':
            return { ...state, name: action.payload}
        case 'SET_LOADING_BUTTON':
            return { ...state, loadingButton: action.payload}
        case 'SET_DIFFICULTY':
            return { ...state, difficulty: action.payload}
        case 'SET_VISIBLE':
            return { ...state, visible: action.payload}
        case 'SET_ERROR_TEXT':
            return { ...state, errText: action.payload}
        default:
            return state
    }
}


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducer,
    composeEnhancers(applyMiddleware(thunk))
)

export default store