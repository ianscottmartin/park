import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import Home from './Home'
import ParkList from './ParkList'
import NavBar from "./NavBar";
import SignupLogin from "./SignupLogin";
import ParkReviews from "./ParkReviews"
import UserReviews from "./UserReviews";
import NewReview from "./NewReview";
import NewPark from "./NewPark";
import UserPage from "./UserPage";


function App() {
  const [parks, setParks] = useState([]);
  const [user, setUser] = useState(null);
  // get Parks
  useEffect(() => {
    fetch('/parks_index')
      .then((r) => r.json())
      .then((data) => setParks(data))
  }, []);

  //auto login
  useEffect(() => {
    fetch('/check_session').then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  if (!user) {
    return <SignupLogin onLogin={setUser} />
  }

  return (
    <div className="app">
      <NavBar user={user} setUser={setUser} />
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route path='/login'>
          <SignupLogin onLogin={setUser} />
        </Route>
        <Route path='/parks'>
          <ParkList parks={parks} />
        </Route>
        <Route path='/parkreviews/:id'>
          <ParkReviews currentUser={user} parks={parks} />
        </Route>
        <Route path='/userreviews/:id'>
          <UserReviews currentUser={user} parks={parks} />
        </Route>
        <Route path='/newpark'>
          <NewPark />
        </Route>
        <Route path='/newreview'>
          <NewReview user={user} parks={parks} />
        </Route>
        <Route path={`/${user.username}`}>
          <UserPage currentUser={user} parks={parks} setAppUser={setUser} />
        </Route>
      </Switch>
    </div>
  )
}


export default App;