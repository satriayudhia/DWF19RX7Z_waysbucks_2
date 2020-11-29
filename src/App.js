import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {Context} from './config/Context'
import PrivateRoute from './config/PrivateRoute'
import LandingGuest from './pages/LandingGuest'
import LandingLogin from './pages/LandingLogin'
import Detail from './pages/Detail'
import Cart from './pages/Cart'
import MyProfile from './pages/MyProfile'
import AddProduct from './pages/AddProduct'
import AddToping from './pages/AddToping'
import Admin from './pages/Admin'

function App() {
  return (
    <Context>
      <Router>
        <Switch>
          <Route exact path="/" component={LandingGuest} />
          <PrivateRoute exact path="/home" component={LandingLogin} />
          <PrivateRoute exact path="/detail/:id" component={Detail} />
          <PrivateRoute exact path="/cart" component={Cart} />
          <PrivateRoute exact path="/profile" component={MyProfile} />
          <PrivateRoute exact path="/add-product" component={AddProduct} />
          <PrivateRoute exact path="/add-toping" component={AddToping} />
          <PrivateRoute exact path="/admin" component={Admin} />
        </Switch>
      </Router>
    </Context>
  );
}

export default App;
