import { useUser } from "@/context/useUserContext"
import { useEffect, type ReactNode } from "react"
import { useNavigate } from "react-router"

const ProtectedRoutes = ({children}: {children: ReactNode}) => {
    const navigate = useNavigate()
    const { userInfo } = useUser()

    useEffect(()=> {
        if(!userInfo.email) {
            navigate("/auth/login")
            return
        }
    }, [userInfo, navigate])
  return <>{children}</>
}

export default ProtectedRoutes