import { useUser } from "@/context/useUserContext"
import { Edit2, Plus, Trash2 } from "lucide-react";
import { useState } from "react";



const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'In progress':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Closed':
        return 'bg-slate-100 text-slate-800 border-slate-200';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-800';
      case 'Medium':
        return 'bg-amber-100 text-amber-800';
      case 'Low':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };

const TicketsCard = () => {
    const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
    const {userInfo, setUserInfo, setEditingTicket, setIsEditDialogOpen }= useUser()
    const tickets = userInfo.tickets

    const handleDelete = (id: string)=> {
        setUserInfo((prev)=> ({
            ...prev,
            tickets: prev.tickets.filter((ticket)=> ticket.id !== id)
        }))
    }
  return (
    <div>
         {tickets.length === 0 ? (
            <div className="bg-card rounded-2xl shadow-lg p-12 text-center">
              <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Plus size={48} className="text-slate-400" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">No tickets yet</h3>
              <p className="text-slate-600 mb-6">Get started by creating your first ticket</p>
              <button
                onClick={()=> setIsEditDialogOpen(true)}
                className="px-6 py-5 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-accent transition-colors inline-flex items-center gap-2 cursor-pointer"
              >
                <Plus size={20} />
                Create Your First Ticket
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tickets.map((ticket) => (
                <div key={ticket.id} className="bg-card rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-slate-900 mb-2">{ticket.title}</h3>
                      {ticket.description && (
                        <p className="text-slate-600 text-sm line-clamp-3">{ticket.description}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                        ticket.status
                      )}`}
                    >
                      {ticket.status.replace('_', ' ')}
                    </span>
                    {ticket.priority && (
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityColor(ticket.priority)}`}>
                        {ticket.priority}
                      </span>
                    )}
                  </div>

                  <div className="text-xs text-slate-500 mb-4">
                    Created: {new Date().toLocaleDateString()}
                  </div>

                  <div className="flex gap-2">
                    <button
                       onClick={() => {
                        setEditingTicket(ticket);
                        setIsEditDialogOpen(true);
                      }}
                      className="flex-1 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg font-medium hover:bg-blue-100 transition-colors flex items-center justify-center gap-2"
                    >
                      <Edit2 size={16} />
                      Edit
                    </button>
                    
                    <button
                      onClick={() => setDeleteConfirm(ticket.id)}
                      className="flex-1 px-4 py-2 bg-red-50 text-red-600 rounded-lg font-medium hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </div>
                
                  {deleteConfirm === ticket.id && (
                    <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-sm text-red-800 mb-3 font-medium">
                        Are you sure you want to delete this ticket?
                      </p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleDelete(ticket.id)}
                          className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
                        >
                          Yes, Delete
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(null)}
                          className="flex-1 px-4 py-2 bg-white text-slate-700 border border-slate-300 rounded-lg font-medium hover:bg-slate-50 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
    </div>
  )
}

export default TicketsCard