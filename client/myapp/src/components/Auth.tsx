import "./Auth.css";
const logo = "/img/icon.jpg";

export const Login = () => {
  return (
    <section className="page auth">
      <div className="auth-background"></div>
      <div className="auth-card">
        <img src={logo} alt="Logo" />
        <h2>Welcome back</h2>
        <form>
          <input type="text" placeholder="Username" />
          <input type="password" placeholder="Password" />
          <input type="submit" value="Sign In" />
        </form>
        <footer>
          Need an account? Sign up <a href="#">here</a>
        </footer>
      </div>
    </section>
  );
};
