import { Outlet } from "react-router-dom"
import Sidebar from "../components/dashboard/Sidebar"

export default function DashboardLayout() {
    return (
        <div className="min-h-screen bg-slate-50 font-sans antialiased text-slate-800 ">
          <Sidebar></Sidebar>
          <Outlet></Outlet>
        </div>
    )
}