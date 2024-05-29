import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Home } from "./components/Home";
import { SearchCepSection } from "./components/SearchCepSection";
import { SearchAddressSection } from "./components/SearchAddressSection";
import { Header } from "./components/Header";
import { LinkButtons } from "./components/LinkButtons";

import "./index.css";

export function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="flex flex-col items-center mx-auto justify-start gap-4 w-11/12 h-[88vh] bg-[#262526] p-8">
        <div className="flex flex-col w-full items-center justify-between gap-4 h-[88vh] bg-[#262526] p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cepsearch" element={<SearchCepSection />} />
            <Route path="/addresssearch" element={<SearchAddressSection />} />
          </Routes>
          <LinkButtons />
        </div>
      </main>
    </BrowserRouter>
  );
}
