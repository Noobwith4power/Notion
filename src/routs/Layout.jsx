import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="bg-slate-900 h-screen overflow-x-hidden">
      <div className="flex-grow mb-2">
        <Outlet></Outlet>
      </div>

      <footer className="h-1/5">
        <hr className="w-full box-content border-2  border-rose-500" />
        <h5 className="text-rose-500">made by Karpovich VV</h5>
      </footer>
    </div>
  );
}
