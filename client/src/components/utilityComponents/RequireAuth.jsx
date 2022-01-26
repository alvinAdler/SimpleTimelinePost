import { useEffect, useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import customAxios from '../utilities/customAxios'
import Cookies from 'js-cookie'

import PageSpinner from './PageSpinner/PageSpinner'

/**
 ** Component Controller Codes!
 ** 0 => Load Page Spinner
 ** 1 => Load the intended component
 ** 2 => Load the Login Component
 */
const RequireAuth = ({children}) => {

    const REJECT_AFTER_AUTH = ["/login", "/register"]

    const [componentController, setComponentController] = useState(0);

    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        const onPageLoad = async () => {

            try{
                const result = await customAxios({
                    method: "POST",
                    url: "/users/verify",
                    headers: {
                        "Authorization": `Bearer ${Cookies.get("authToken")}`
                    }
                })

                // setTimeout(() => {
                //     const result = {status: 200}

                //     console.log(result)
                //     if(result.status === 200){
                //         authContext.setIsAuth(result.status === 200)
                //         setComponentController(1)
                //         return
                //     }
                //     setComponentController(2)

                // }, 5000)

                console.log(result)

                if(result.status === 200){
                    // authContext.setIsAuth(result.status === 200)
                    console.log(location.pathname)
                    if(REJECT_AFTER_AUTH.includes(location.pathname)){
                        console.log("I am here")
                        navigate(-1, {replace: true})
                        return
                    }

                    setComponentController(1)
                    return
                }
            }
            catch(err){
                console.log("An error has occured in the required auth component")
                console.log(err.response)
                if(REJECT_AFTER_AUTH.includes(location.pathname)){
                    setComponentController(1)
                }else{
                    setComponentController(2)
                }
            }
        }

        onPageLoad()
    }, [location.pathname])

    return(
        <>
            {componentController === 0 ? 
                <PageSpinner/>

            :

                componentController === 1 ? 
                    <>{children}</>
                :
                    <Navigate to="/login" replace={true}/>
                
            }
        </>
    )
}

export default RequireAuth
