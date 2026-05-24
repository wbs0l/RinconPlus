import { useState } from "react";

import Sidebar from "../components/Sidebar.jsx";

import ProductsTable from "../components/ProductsTable.jsx";
import CreateProduct from "../components/CreateProduct.jsx";
import EditProduct from "../components/EditProduct.jsx";
import DeleteProduct from "../components/DeleteProduct.jsx";
import Reservas from "../components/Reservas.jsx";
import { useEffect } from "react";

function Admin() {
  // aqui vive la logica para mostrar cada sección del admin dependiendo de lo que se seleccione en el sidebar
  const [activeSection, setActiveSection] = useState("Productos");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/login";
    }
  }, []);

  const renderSection = () => {
    switch (activeSection) {
      case "Productos":
        return <ProductsTable />;
      case "Crear":
        return <CreateProduct />;
      case "Editar":
        return <EditProduct />;
      case "Eliminar":
        return <DeleteProduct />;
      case "Reservas":
        return <Reservas />;
      case "Logout":
        // elimina token y user del localstorage del navegador
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/login";
      default:
        return <ProductsTable />;
    }
  };
  return (
    <div className="flex bg-gray-950 text-white min-h-screen">
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      <main className="flex-1 p-10 bg-gray-950">{renderSection()}</main>
    </div>
  );
}

export default Admin;
