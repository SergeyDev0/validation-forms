import React from 'react';
import Form from './components/Form';
import './scss/index.scss';

export const StateFormContext = React.createContext();

function App() {
  const [toggleForm, setToggleForm] = React.useState(false);
  
  return ( 
    <StateFormContext.Provider value={{setToggleForm, toggleForm}}>
      <button onClick={() => setToggleForm(!toggleForm)}>Open Form</button>
      { toggleForm && <Form /> }
    </StateFormContext.Provider>
  );
}

export default App;
