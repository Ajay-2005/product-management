import { Link, useNavigate } from "react-router-dom";
import "./signin.css";
import signinImage from "../../assets/BG.png";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useState } from "react";
import { handleLogin } from "../../services/authService";
function SignIn() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }
    const handleSubmit = async (e) => {
        console.log(formData);
        e.preventDefault();
        try {
            const response = await handleLogin(formData);
            if (response) {
                navigate("/signup");
            }
        }
        catch (err) {
            setError(err.message);
        }
    }
    return (
        <div className="signin-container">

            <div className="signin-left">
                <div className="sign-in-section">
                    <h2>Sign In to
                        Your Account</h2>
                    <form className="signin-form" onClick={handleSubmit}>
                        <div className="input-group">
                            <i className="fas fa-envelope"></i>
                            <input type="email" placeholder="Email" required onChange={handleChange} />
                        </div>

                        <div className="input-group">
                            <i className="fas fa-lock"></i>
                            <input type="password" placeholder="Password" required onChange={handleChange} />
                        </div>
                        <div className="forgot-password">
                            <Link to="">Forgot Password?</Link>
                        </div>

                        <div className="button-wrapper">
                            <button type="submit">Sign In</button>
                        </div>
                    </form>
                </div>
            </div>

            <div className="signin-right" style={{ backgroundImage: `url(${signinImage})` }}>
                <div className="text-group">
                    <h2>Hello Friend!</h2>
                    <p>Enter your personal details and start your journey with us</p>
                    <Link to="/signup" className="auth-button">Sign Up</Link>
                </div>
            </div>
        </div>
    );
}

export default SignIn;
