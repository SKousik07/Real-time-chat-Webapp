import React, { useState, useEffect } from "react";
import "./App.css";
import Home from "./components/Home/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Mainpage from "./components/Mainpage/Mainpage";
import { useStateValue } from "./context";
import { auth, db } from "./firebase";
import ReactLoading from "react-loading";

function App() {
  // const [user, setUser] = useState("kousik");
  const [{ name, id, isLoading }, dispatch] = useStateValue();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //set user on authchanged
        dispatch({
          type: "SET_USER",

          name: "",
          photoUrl: authUser.photoURL,
          id: authUser.uid,
          about: "",
        });
        // db.collection("users")
        //   .doc(authUser.uid)
        //   .get()
        //   .then((doc) => {
        //     if (doc.exists) {
        //       console.log("exists");
        //     }
        //     const data = doc.data();
        //     console.log("data" + data);
        //     dispatch({
        //       type: "SET_USER",

        //       name: data.name,
        //       photoUrl: data.photoUrl,
        //       id: data.id,
        //       about: data.about,
        //     });
        //     // }
        // });
      } else {
        dispatch({
          type: "SET_USER",
          name: null,
          photoUrl: "",
          id: null,
          about: "",
        });
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);
  useEffect(() => {
    if (id) {
      //getting user list
      db.collection("users").onSnapshot((snapshot) => {
        dispatch({
          type: "SET_USERS_LIST",
          usersList: snapshot.docs
            .map((doc) => doc.data())
            .filter((data) => data.id != id),
        });
        // console.log(name, id);
        const user = snapshot.docs
          .map((doc) => doc.data())
          .filter((data) => data.id === id)[0];
        // console.log(user + "user");
        dispatch({
          type: "SET_USER",
          name: user.name,
          photoUrl: user.photoUrl,
          id: user.id,
          about: user.about,
        });
      });

      //i am getting about details
      // db.collection("users")
      //   .doc(id)
      //   .get()
      //   .then((doc) => {
      //     const data = doc.data();

      //     dispatch({
      //       type: "SET_USER",

      //       name: data.name,
      //       photoUrl: data.photoUrl,
      //       id: data.id,
      //       about: data.about,
      //     });
      //   });
    }
  }, [id]);

  return (
    <Router>
      <div className="App">
        {name ? <Mainpage /> : <Home />}
        {isLoading ? (
          <div className="viewLoading">
            <ReactLoading
              type={"spin"}
              color={"#203152"}
              height={"3%"}
              width={"3%"}
            />
          </div>
        ) : null}
      </div>
    </Router>
  );
}

export default App;
