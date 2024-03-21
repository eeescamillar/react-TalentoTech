import { useNavigate } from "react-router-dom";
import UserForm from "./UserForm";
import { useCreateUserMutation } from "../../features/api/apiSlice";
import Swal from "sweetalert2";

export default function UserFormCreate() {

  const navigate = useNavigate(); // Instanciamos la vaiable de useNavigate
  const [createUser] = useCreateUserMutation()

  const onFileChange = (e) => {
    console.log(e.target.files)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      name: e.target.name.value,
      lastname: e.target.lastname.value,
      email: e.target.email.value,
      id: e.target.id.value,
      password: e.target.password.value,
    }
    try {
      const response = await createUser(newUser)
      if (response.data.status == 'error') {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "El usuario no pudo ser registrado, por favor valide nuevamente",
          showConfirmButton: false,
          timer: 1500
        })
      } else {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Usuario Creado Correctamente",
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          navigate('/user') // Hacemos la redireccion
        });
      }
    } catch (error) {
      console.log(error)
    }

  }
  return (
    <UserForm props={{ handleSubmit: handleSubmit, onFileChange: onFileChange,user: null }} />
  );
}
