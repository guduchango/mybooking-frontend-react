import { BrowserRouter } from 'react-router-dom';
import RouteCustom from './RouteCustom/RouteCustom';
import { GlobalContextProvider } from './Context/Context';




function App() {
  return (
    <>
    <GlobalContextProvider>
      <BrowserRouter>
        <RouteCustom />
      </BrowserRouter>
    </GlobalContextProvider>
    </>
  )
}


export default App

