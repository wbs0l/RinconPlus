import { useState } from "react";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    try {
      const response = await fetch(
        "https://rinconplus.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error al iniciar sesion");
      }

      // guarda  token
      localStorage.setItem("token", data.token);

      //guarda info de user
      localStorage.setItem("user", JSON.stringify(data.user));

      //redirije a la parte de administracion
      window.location.href = "/admin";
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-8 rounded-xl w-96 border border-yellow-500"
      >
        <h1 className="text-3xl text-yellow-400 font-bold mb-6 text-center">
          Login Admin
        </h1>

        {error && (
          <p className="bg-red-500 text-white p-2 rounded mb-4">{error}</p>
        )}

        <input
          type="text"
          name="email"
          placeholder="Usuario"
          value={formData.email}
          onChange={handleChange}
          className="w-full mb-4 p-3 rounded bg-gray-800 text-white"
        />

        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={formData.password}
          onChange={handleChange}
          className="w-full mb-6 p-3 rounded bg-gray-800 text-white"
        />

        <button
          type="submit"
          className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 rounded"
        >
          Iniciar sesión
        </button>
      </form>
    </div>
  );
}
export default Login;
