// Routes
import RouteProvider from "./Routes/RouteProvider"

// States
import store from './states/store'
import { Provider } from 'react-redux'



function App() {

 
  return (
    <>
    <Provider store={store}>
      <RouteProvider/>
    </Provider>
    </>
  )
}

export default App
