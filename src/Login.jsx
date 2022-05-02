import React, { useReducer } from 'react';
import fakeLogin from './fakeLogin';

// create an initialState objecto for useReducer
const initialState = {
  username: '',
  password: '',
  isLoading: false,
  error: null,
};

// reducer function to change useState
const reducer = (state, action) => {
  switch (action.type) {
    case 'beforeLogin':
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case 'success':
      return {
        ...state,
        username: '',
        password: '',
        isLoading: false,
      };
    case 'error':
      return {
        ...state,
        error: 'Sorry! There was an error logging you in.',
        password: '',
        isLoading: false,
      };
    case 'updateField':
      return {
        ...state,
        [action.field]: action.value,
      };
    default:
      return state;
  }
};

export default function Login() {
  // useReducer to simplify useState
  const [state, dispatch] = useReducer(reducer, initialState);

  /*
  No longer needed
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  */

  function handleLogin(e) {
    e.preventDefault();

    /*
    No longer needed
    setIsLoading(true);
    setError(null);
    */
    dispatch({ type: 'beforeLogin' });

    fakeLogin(state.username, state.password)
      .then(response => {
        alert('Logged in successfully');
        dispatch({ type: 'success' });
      })
      .catch(error => {
        dispatch({ type: 'error' });
      });
  }

  return (
    <form action="#" method="POST" onSubmit={handleLogin}>
      {state.error && <p className="error">{state.error}</p>}
      <div className="form-input">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          className="input"
          id="username"
          value={state.username}
          onChange={e =>
            dispatch({
              type: 'updateField',
              field: 'username',
              value: e.target.value,
            })
          }
        />
      </div>
      <div className="form-input">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          className="input"
          value={state.password}
          onChange={e =>
            dispatch({
              type: 'updateField',
              field: 'password',
              value: e.target.value,
            })
          }
        />
      </div>
      <div className="form-input">
        <button className="button">Login</button>
        {state.isLoading && <span>Loading...</span>}
      </div>
    </form>
  );
}
