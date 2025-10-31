import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface ToastType {
    status?: "success" | "error",
    message: string
}

interface ToastContextType {
    toast: ToastType,
    setToast: React.Dispatch<React.SetStateAction<ToastType>>
}

type Props = {
    children: ReactNode
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export const ToastProvider = ({children}: Props)=> {
    const [toast, setToast] = useState<ToastType>({
        message: ""
    })

    return (
        <ToastContext.Provider value={{toast, setToast}}>
             {children}
            {toast.message && (
              <div
                className={`fixed top-5 right-5 z-50 px-6 py-4 rounded-2xl shadow-2xl backdrop-blur-sm transition-all duration-500 transform animate-in slide-in-from-right-5 min-w-[320px] max-w-md ${
                  toast.status === "success" 
                    ? "bg-linear-to-br from-green-50 to-emerald-50 border-2 border-green-300" 
                    : "bg-linear-to-br from-red-50 to-rose-50 border-2 border-red-300"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    toast.status === "success" ? "bg-green-500" : "bg-red-500"
                  }`}>
                    {toast.status === "success" ? (
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    )}
                  </div>
                  <div className="flex-1 space-y-1">
                    <h2 className={`text-base font-bold capitalize ${
                      toast.status === "success" ? "text-green-900" : "text-red-900"
                    }`}>
                      {toast.status}
                    </h2>
                    <p className={`text-sm leading-relaxed ${
                      toast.status === "success" ? "text-green-700" : "text-red-700"
                    }`}>
                      {toast.message}
                    </p>
                  </div>
                </div>
                <div className={`mt-3 h-1 rounded-full overflow-hidden ${
                  toast.status === "success" ? "bg-green-200" : "bg-red-200"
                }`}>
                  <div className={`h-full rounded-full animate-[shrink_3s_linear_forwards] ${
                    toast.status === "success" ? "bg-green-500" : "bg-red-500"
                  }`} style={{width: '100%'}} />
                </div>
              </div>
            )}
        </ToastContext.Provider>
        
    )
}

export const useToast = ()=> {
    const context = useContext(ToastContext)
    if(!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}