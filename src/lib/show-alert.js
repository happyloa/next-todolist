import Swal from "sweetalert2";

const showAlert = (title, text, icon, confirmButtonText) => {
  return Swal.fire({
    title,
    text,
    icon,
    confirmButtonText,
  });
};

export default showAlert;
