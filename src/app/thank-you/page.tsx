import { Suspense } from "react";
import ThankYou from "./ThankYou";

function Page() {
  return (
    <Suspense>
      <ThankYou />
    </Suspense>
  );
}

export default Page;
