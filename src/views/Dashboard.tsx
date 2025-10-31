import Actions from "@/components/Dashboard/Actions"
import Header from "@/components/Dashboard/Header"
import Stats from "@/components/Dashboard/Stats"
import ProtectedRoutes from "@/components/ProtectedRoutes"

const Dashboard = () => {
  return (
    <main>
      <ProtectedRoutes>
        <Header />
        <Stats />
        <Actions />
      </ProtectedRoutes>
    </main>
  )
}

export default Dashboard