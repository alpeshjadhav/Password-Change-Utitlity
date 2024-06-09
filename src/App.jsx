import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./component/Home";
import { ChangePasswordForm } from "./component/ChangePasswordForm";
import { SelectAuthentication } from "./component/SelectAuthentication";
import { SMSAuthentication } from "./component/SMSAuthentication";
import { LoginPage } from "./component/LoginPage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/member/cymmetri" element={<Home />}>
            <Route path="/member/cymmetri/login" element={<LoginPage />} />
            <Route
              path="/member/cymmetri/changePassword"
              element={<ChangePasswordForm />}
            />
            <Route
              path="/member/cymmetri/selectAuthentication"
              element={<SelectAuthentication />}
            />
            <Route
              path="/member/cymmetri/smsAuthentication"
              element={<SMSAuthentication />}
            />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
