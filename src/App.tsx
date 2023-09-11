import {Route,Routes} from "react-router-dom";
import SignIn from "./Components/Signin";
import { SignUp } from "./Components/SignUp";
import { Mainpage } from "./pages/Mainpage";
function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<SignUp/>}></Route>
      <Route path="/signin" element={<SignIn/>}></Route>
      <Route path="/home" element={<Mainpage/>}></Route>
    </Routes>
    </>
  )
}

export default App
