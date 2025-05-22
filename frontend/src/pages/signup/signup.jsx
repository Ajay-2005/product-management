import { Link, useNavigate } from "react-router-dom";
import "./signup.css"
import signupImage from "../../assets/BG.png";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useState, useEffect } from "react";
import { handleSignup } from "../../services/authService";

function Signup() {
    const [formData, setFormData] = useState({
        name: "",
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
    };
    const handleSubmit = async (e) => {
        console.log(formData);
        e.preventDefault();
        try {
            const response = await handleSignup(formData);
            if (response) {
                navigate("/signin");
            }
        }
        catch (err) {
            setError(err.message);
        }

    }
    return (
        <div className="signup-container">
            <div className="signup-left" style={{ backgroundImage: `url(${signupImage})` }}>
                <div className="text-group">
                    <h2>Welcome Back!</h2>
                    <p>To keep connected with us plase login with your personal info</p>
                    <Link to="/signin" className="auth-button">Sign In</Link>
                </div>
            </div>

            <div className="signup-right">
                <div className="create-account-section">
                    <h2>Create Account</h2>
                    <form className="signup-form" onSubmit={handleSubmit}>
                        <div className="input-group">
                            <i className="fas fa-user"></i>
                            <input type="text" placeholder="Name" required onChange={handleChange} />
                        </div>

                        <div className="input-group">
                            <i className="fas fa-envelope"></i>
                            <input type="email" placeholder="Email" required onChange={handleChange} />
                        </div>

                        <div className="input-group">
                            <i className="fas fa-lock"></i>
                            <input type="password" placeholder="Password" required onChange={handleChange} />
                        </div>

                        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

                        <div className="button-wrapper">
                            <button type="submit">Sign Up</button>
                        </div>
                    </form>

                </div>
            </div >
        </div >
    );
}

export default Signup;
