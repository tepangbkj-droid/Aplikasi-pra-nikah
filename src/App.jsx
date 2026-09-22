import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import TodoPage from "./pages/TodoPage";
import GoldPage from "./pages/GoldPage";
import VendorPage from "./pages/VendorPage";
import ItemsPage from "./pages/ItemsPage";
import FinancePage from "./pages/FinancePage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/checklist" element={<TodoPage />} />
          <Route path="/emas" element={<GoldPage />} />
          <Route path="/vendor" element={<VendorPage />} />
          <Route path="/barang" element={<ItemsPage />} />
          <Route path="/keuangan" element={<FinancePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
