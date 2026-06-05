import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function AuthLayout(){
    return (
        <div className="min-h-screen bg-slate-50 font-sans antialiased text-slate-800 ">
          <Navbar></Navbar>
          <Outlet></Outlet>
        </div>
    )
}