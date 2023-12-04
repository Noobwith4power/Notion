import { Suspense } from "react";
import { Link } from "react-router-dom";

export default function Redirect() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex flex-col text-center mt-20">
        <div>
          <h1 className="font-bold text-3xl  text-rose-500">404</h1>
          <h1 className="font-bold text-4xl  text-rose-500">Page not found</h1>
        </div>
        <div className="font-bold text-rose-300 font-mono underline">
          <Link to={"/"}>Go Home</Link>
        </div>
      </div>
    </Suspense>
  );
}
