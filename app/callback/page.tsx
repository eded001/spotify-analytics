import { Suspense } from "react";
import Callback from "./Callback";

export default function Page() {
    return (
        <Suspense fallback={<p>Carregando...</p>}>
            <Callback />
        </Suspense>
    );
}