import ProtectedRoutes from "@/components/ProtectedRoutes"
import Header from "@/components/Tickets/Header"
import TicketsCard from "@/components/Tickets/TicketsCard"


const Tickets = () => {
  return (
    <>
      <ProtectedRoutes>
        <Header />
        <TicketsCard />
      </ProtectedRoutes>
    </>
  )
}

export default Tickets