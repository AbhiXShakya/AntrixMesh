import { GoogleLogin } from "react-google-login";
import "./Login.css";
import FacebookLogin from "react-facebook-login";

const clientId =
  "666743102967-humikr8ibktjr2oeeb3pmldbdf9qmvol.apps.googleusercontent.com";

function Login({ onLogin }) {
  const onLoginSuccess = (res) => {
    onLogin(res.profileObj);
  };

  const onLoginFailure = (res) => {};

  const responseFacebook = (response) => {
    console.log(response);
  };

  return (
    <div className="container">
      <div className="card">
        <h3>Welcome!</h3>
        <p>
          We love to form a team, work with enthusiastic, creative people, and
          have a great learning attitude. And hear that you fit the bill
          perfectly. It's great to have you with us. Warmest welcome!
        </p>
        <div className="signin-btn">
          <GoogleLogin
            clientId={clientId}
            buttonText="Sign In"
            onSuccess={onLoginSuccess}
            onFailure={onLoginFailure}
            cookiePolicy={"single_host_origin"}
            isSignedIn={true}
          />
          <FacebookLogin
            appId="447758823413237"
            autoLoad={true}
            fields="name,email,picture"
            onClick={(e) => {
              e.preventDefault();
              console.log("clicked", e.target.value);
            }}
            callback={responseFacebook}
          />
        </div>
      </div>
    </div>
  );
}
export default Login;
