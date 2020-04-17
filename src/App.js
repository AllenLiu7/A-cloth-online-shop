import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import "./App.css";

import HomePage from "./pages/home-page/homepage.component";
import CheckoutPage from "./pages/checkout-page/checkout-page.component";
import ShopPage from "./pages/shop-page/shop-page.component";
import Header from "./components/header/header.component";
import SignPage from "./pages/sign-in&up-page/sign-in&up-page.component";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import { setCurrentUser } from "./redux/user/user.action";
import { selectCurrentUser } from "./redux/user/user.seletors";

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser, collectionsArray } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userRef = await createUserProfileDocument(user);
        console.log(user);

        //noSnapshot is a listener, when ever snapshot is changed, onSnapShot will run
        userRef.onSnapshot((snapShot) => {
          setCurrentUser(
            {
              currentUser: {
                id: snapShot.id,

                //.data()will get back properties stored in db
                ...snapShot.data(),
              },
            },
            () => {
              console.log(this.state);
            }
          );
        });
      } else {
        setCurrentUser(user);
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route
            exact
            path="/sign"
            render={() =>
              this.props.currentUser ? <Redirect to="/" /> : <SignPage />
            }
          />
          <Route exact path="/checkout" component={CheckoutPage} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: selectCurrentUser(state),
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
