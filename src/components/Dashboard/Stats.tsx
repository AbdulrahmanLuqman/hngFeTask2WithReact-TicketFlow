import { CheckCircle, Clock, TicketIcon, XCircle } from "lucide-react"
import { useUser } from "@/context/useUserContext"

const Stats = () => {
    const { userInfo } = useUser()
    const tickets = userInfo.tickets

    const stats = {
        tickets: tickets?.length,
        inProgress: tickets?.filter((ticket)=> ticket.status === "In progress").length,
        opened: tickets?.filter((ticket)=> ticket.status === "Open").length,
        closed: tickets?.filter((ticket)=> ticket.status === "Closed").length
    }
  return (
    <section>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="border-2 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-linear-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                  <TicketIcon className="text-white" size={24} />
                </div>
                <span className="text-3xl font-bold text-card-foreground">{stats.tickets}</span>
              </div>
              <h3 className="text-sm font-medium text-slate-600">Total Tickets</h3>
            </div>

            <div className="border-2 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-linear-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                  <CheckCircle className="text-white" size={24} />
                </div>
                <span className="text-3xl font-bold text-card-foreground">{stats.opened}</span>
              </div>
              <h3 className="text-sm font-medium text-slate-600">Open Tickets</h3>
            </div>

            <div className="border-2 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-linear-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center">
                  <Clock className="text-white" size={24} />
                </div>
                <span className="text-3xl font-bold text-card-foreground">{stats.inProgress}</span>
              </div>
              <h3 className="text-sm font-medium text-slate-600">In Progress</h3>
            </div>

            <div className="border-2 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-linear-to-br from-slate-400 to-slate-600 rounded-full flex items-center justify-center">
                  <XCircle className="text-white" size={24} />
                </div>
                <span className="text-3xl font-bold text-card-foreground">{stats.closed}</span>
              </div>
              <h3 className="text-sm font-medium text-slate-600">Resolved</h3>
            </div>
          </div>
    </section>
  )
}

export default Stats