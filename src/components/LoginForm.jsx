import { useState } from "react";
import { Navigate, useNavigate } from "react-router";
import styled from "styled-components";
import { loginRequest } from "../api/auth";
import { useAuth } from "../contexts/AuthContext";
import { getJwtPayload } from "../utils/jwt";

const LoginCard = styled.div`
  border: 1px black solid;
  border-radius: 8px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    > label {
      font-weight: bold;
    }
    > #login-error-span {
      color: red;
    }
  }
`;

export default function LoginForm() {
  const { login, isAuthenticated } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  if (isAuthenticated) return <Navigate to="/dashboard" />;

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    try {
      const { token } = await loginRequest({ email, password });
      const payload = getJwtPayload(token);

      if (!payload) throw new Error("Invalid token");

      login({ userId: payload.userId, userType: payload.userType, token });
      console.log("You are now logged in, woohoo");
      navigate("/dashboard");
    } catch (error) {
      setError(error.message);
      console.log(error);
    }
  };

  return (
    <LoginCard>
      <h2>Log In</h2>
      <form onSubmit={handleLoginSubmit}>
        <label>
          Email:{" "}
          <input
            type="text"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Enter your email"
            required
          />
        </label>
        <label>
          Password:{" "}
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter your password"
            required
          />
        </label>
        <span id="login-error-span">{error || ""}</span>
        <button type="submit">Log In</button>
      </form>
    </LoginCard>
  );
}
