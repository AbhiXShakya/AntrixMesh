import "./Login.css";
import {
  facebookProvider,
  googleProvider,
  twitterProvider,
} from "./socialProviders";
import { signInWithPopup } from "firebase/auth";
import { fireAuth } from "./firebaseConfig";
import { GrFacebookOption, GrGoogle, GrTwitter } from "react-icons/gr";

function Login({ onLogin }) {
  const handleLoginClick = async (provider) => {
    const res = (provider) => {
      signInWithPopup(fireAuth, provider)
        .then((res) => {
          onLogin(res.user);
          console.log(res.user);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    await res(provider);
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
        <p className="cont-with">Continue with</p>
        <div className="signin-btn">
          <button
            onClick={() => {
              handleLoginClick(googleProvider);
            }}
          >
            <GrGoogle />
          </button>
          <button
            onClick={() => {
              handleLoginClick(facebookProvider);
            }}
          >
            <GrFacebookOption />
          </button>

          <button
            onClick={() => {
              handleLoginClick(twitterProvider);
            }}
          >
            <GrTwitter />
          </button>
        </div>
      </div>
    </div>
  );
}
export default Login;
