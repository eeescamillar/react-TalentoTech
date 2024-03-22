import { useState } from "react";
import { useLoginMutation } from "../../features/api/apiSlice";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Login() {

  const [login] = useLoginMutation();
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError(false)
      const user = {
        email: e.target.email.value,
        password: e.target.password.value,
      }
      const response = await login(user)
      if (response.error && response.error.data.status == "error") {
        setError(true)
      } else {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "¡Bienvenido!",
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          navigate('/user')
        });
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="max-w-lg w-full mx-auto px-5 py-5">
      {!error ? null :
        (<div className="flex justify-center bg-teal-200 text-red-500 font-bold">Datos invalidos</div>)
      }
      <form onSubmit={handleSubmit} className="bg-indigo-50 shadow-md rounded pt-6 pb-10 px-5">
        <div className="mb-4">
          <label id="email" className="block text-gray-700 font-bold mb-2" htmlFor="email">Email</label>
          <input type="email" name="email" placeholder="Email"
            className="shadow appearance-none border rounded w-full focus:shadow-outline disabled:bg-slate-50 
            disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 
            invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Password</label>
          <input type="password" require name="password" placeholder="Password"
            className="shadow appearance-none border rounded w-full focus:shadow-outline disabled:bg-slate-50 
            disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 
            invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500" />
        </div>
        <div className="flex justify-center">
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 rounded text-blue-50 font-bold py-2 px-4">Iniciar Sesion</button>
        </div>

      </form>
    </div>
  );
}
