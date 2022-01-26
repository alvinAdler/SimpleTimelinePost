import Cookies from 'js-cookie'
import swal from 'sweetalert2'

export const logout = () => {
    Object.keys(Cookies.get()).map((item) => {
        Cookies.remove(item)
    })

    swal.fire({
        icon: "success",
        title: "Successfully logged out!",
        text: "You will be directed to the login page",
        confirmButtonColor: "#2285e4"
    })
    .then(() => {
        window.location.reload()
    })
}