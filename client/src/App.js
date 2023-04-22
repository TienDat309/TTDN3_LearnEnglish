import {
  BrowserRouter,
} from "react-router-dom";
import Page from "./pages/pages";
import { DataProvider } from "./GlobalState";

function App() {
  return (
    <DataProvider>
    <BrowserRouter>
      <Page>{/* VD : localhost:3000/ */}</Page>
    </BrowserRouter>
    </DataProvider>
  );
}

export default App;