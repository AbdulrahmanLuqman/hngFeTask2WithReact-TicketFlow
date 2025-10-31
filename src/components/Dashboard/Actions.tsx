import { Clock, Plus, TicketIcon } from "lucide-react"
import { useNavigate } from "react-router"

const Actions = () => {
    const navigate = useNavigate()
  return (
    <section>
        <div className="bg-card rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Quick Actions</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <button
                onClick={() => navigate('/tickets')}
                className="p-6 border-2 border-slate-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all text-left group"
              >
                <Plus className="text-blue-600 mb-3 group-hover:scale-110 transition-transform" size={32} />
                <h3 className="font-semibold text-slate-900 mb-1">Create New Ticket</h3>
                <p className="text-sm text-slate-600">Start tracking a new issue or request</p>
              </button>

              <button
                onClick={() => navigate('/tickets')}
                className="p-6 border-2 border-slate-200 rounded-xl hover:border-green-500 hover:bg-green-50 transition-all text-left group"
              >
                <TicketIcon className="text-green-600 mb-3 group-hover:scale-110 transition-transform" size={32} />
                <h3 className="font-semibold text-slate-900 mb-1">View All Tickets</h3>
                <p className="text-sm text-slate-600">Browse and manage your tickets</p>
              </button>

              <button
                onClick={() => navigate('/tickets')}
                className="p-6 border-2 border-slate-200 rounded-xl hover:border-amber-500 hover:bg-amber-50 transition-all text-left group"
              >
                <Clock className="text-amber-600 mb-3 group-hover:scale-110 transition-transform" size={32} />
                <h3 className="font-semibold text-slate-900 mb-1">Active Tickets</h3>
                <p className="text-sm text-slate-600">Focus on tickets in progress</p>
              </button>
            </div>
          </div>
    </section>
  )
}

export default Actions