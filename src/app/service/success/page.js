import { Suspense } from "react";
import OrderSuccess from "./successpage";


export default function SuccessPage() {
  return (
    <div className="h-screen flex items-center justify-center">
      <Suspense fallback={<p>Loading...</p>}>
        <OrderSuccess/>
      </Suspense>
    </div>
  );
}