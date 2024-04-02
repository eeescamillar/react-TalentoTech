import { useState } from "react";
import { useLoginMutation, useUpdateUserMutation } from "../../features/api/apiSlice";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function ChangePassword() {

  const [newPassword, setNewPassword] = useState("")
  const [repeatNewPassword, setRepeatNewPassword] = useState("")
  const [notEqualPassword, setNotEqualPassword] = useState(false)
  const [isError, setIsError] = useState(false)

  const handleChangeNewPassword = (e) => {
    setNewPassword(e.target.value)
  }

  const handleChangeRepeatNewPassword = (e) => {
    setRepeatNewPassword(e.target.value)
    setNotEqualPassword(!(newPassword === e.target.value))
  }

  const user = useSelector((state) => state.auth.user);
  const [login] = useLoginMutation();
  const [updateUser] = useUpdateUserMutation();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsError(false)
    const userValidate = {
      email: user.email,
      password: e.target.password.value,
    }
    const response = await login(userValidate)
    if (response.error && response.error.data.status == "error") {
      setIsError(true)
    } else {
      if (!notEqualPassword) {
        const newUser = {
          _id: user._id,
          password: e.target["new-password"].value
        }
        console.log(newUser)
        const response = await updateUser(newUser)
        if (response.data.status == "error") {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Error actualizando la contraseña",
            showConfirmButton: false,
            timer: 1500
          })
        } else {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Contraseña actualizada Correctamente",
            showConfirmButton: false,
            timer: 1500
          }).then(()=>{
              navigate('/user')
            })
        }
      }
    }
  }

  return (
    <div className="max-w-lg w-full mx-auto px-5 py-5">
      <form onSubmit={handleSubmit} className="bg-indigo-50 shadow-md rounded pt-6 pb-10 px-5">

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="password">Current Password</label>
          <input type="password" require name="password" placeholder="Password"
            className="shadow appearance-none border rounded w-full focus:shadow-outline" />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="new-password">New Password</label>
          <input type="password" require name="new-password" placeholder="New password"
            className="shadow appearance-none border rounded w-full focus:shadow-outline"
            onChange={handleChangeNewPassword} />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="repeat-new-password">Repeat New Password</label>
          <input type="password" require name="repeat-new-password" placeholder="Repeat New Password"
            className="shadow appearance-none border rounded w-full focus:shadow-outline"
            onChange={handleChangeRepeatNewPassword} />
          {notEqualPassword ?
            <span className="text-red-600">Las contraseñas no coinciden</span>
            : null
          }
        </div>


        <div className="flex justify-center">
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 rounded text-blue-50 font-bold py-2 px-4">
            Change Password
          </button>
        </div>

      </form>
    </div>
  );

}
