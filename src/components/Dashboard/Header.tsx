import { useNavigate } from "react-router"
import { Plus } from "lucide-react"
import { LogOut } from "lucide-react"
import { useUser } from "@/context/useUserContext"
import { Button } from "../ui/button"


const Header = () => {
    const { userInfo, setUserInfo } = useUser()
    const navigate = useNavigate()

    const handleLogout = ()=> {
      localStorage.removeItem("user")

      setUserInfo({
        email: "",
        password: "",
        tickets: []
      })
    }
  return (
    <header className="">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h1 className="text-4xl font-bold text-slate-900">Dashboard</h1>
              <p className="text-slate-600 mt-2">Welcome back, {userInfo?.email}</p>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={() => navigate('/tickets')}
                className="cursor-pointer px-6 py-7 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-accent hover:text-accent-foreground transition-colors flex items-center gap-2 shadow-lg hover:shadow-xl"
              >
                <Plus size={20} />
                Manage Tickets
              </Button>
              <Button
                variant={"outline"}
                onClick={handleLogout}
                className="cursor-pointer px-6 py-7 hover:bg-primary text-foreground border border-primary rounded-lg font-semibold transition-colors flex items-center gap-2"
              >
                <LogOut size={20} />
                Logout
              </Button>
            </div>
          </div>
        </div>
    </header>
  )
}

export default Header