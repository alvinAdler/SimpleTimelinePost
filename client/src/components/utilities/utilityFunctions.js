import Cookies from 'js-cookie'
import swal from 'sweetalert2'

export const logout = () => {

    swal.fire({
        icon: "question",
        title: "Confirmation",
        text: "Are you sure you want to logout?",
        showCancelButton: true,
        customClass: {
            popup: "swal-custom-popup",
            icon: "swal-icon",
            confirmButton: "swal-custom-confirm",
            cancelButton: "swal-custom-cancel"
        }
    })
    .then((res) => {
        if(res.isConfirmed){
            Object.keys(Cookies.get()).map((item) => {
                Cookies.remove(item)
            })
        
            swal.fire({
                icon: "success",
                title: "Successfully logged out!",
                text: "You will be directed to the login page",
                customClass: {
                    popup: "swal-custom-popup",
                    icon: "swal-icon",
                    confirmButton: "swal-custom-confirm",
                    cancelButton: "swal-custom-cancel"
                }
            })
            .then(() => {
                window.location.reload()
            })
        }
    })
}