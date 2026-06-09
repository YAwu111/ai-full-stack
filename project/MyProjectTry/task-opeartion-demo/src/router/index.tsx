import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

const Home = lazy(() => import("../pages/Home"));
const Search = lazy(() => import("../pages/Search"));
const Statistics = lazy(() => import("../pages/Statistics"));

export default function Router() {
    return (
        <Suspense fallback={<div>加载中...</div>}>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<Search />} />
                <Route path="/statistics" element={<Statistics />} />
            </Routes>
        </Suspense>
    )
}