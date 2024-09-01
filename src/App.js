import React, { useState } from "react";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";

function App() {
  const [isSignUp, setIsSignUp] = useState(true);

  const handleSignUpClick = () => {
    setIsSignUp(true);
  };

  const handleSignInClick = () => {
    setIsSignUp(false);
  };

  return (
    <div>
      {isSignUp ? (
        <SignUp onSignInClick={handleSignInClick} />
      ) : (
        <SignIn onSignUpClick={handleSignUpClick} />
      )}
    </div>
  );
}

export default App;
