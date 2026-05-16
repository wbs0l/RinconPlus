import { useState, useRef, useEffect } from "react";
import "../App.css";

export default function Carta() {
  const [menuComidaItems, setMenuComidaItems] = useState([]);
  const [menuBebidasItems, setMenuBebidasItems] = useState([]);

  useEffect(() => {
    // Simular fetch de datos (puedes reemplazar esto con una llamada real a una API)
    const fetchMenuComidaItems = async () => {
      try {
        const res = await fetch("/menuComida.json");
        const data = await res.json();
        setMenuComidaItems(data);
      } catch (error) {
        console.error("Error en el fetch de items de comida:", error);
      }
    };

    const fetchMenuBebidasItems = async () => {
      try {
        const res = await fetch("https://rinconplus.onrender.com/drinks");
        const data = await res.json();
        setMenuBebidasItems(data);
      } catch (error) {
        console.error("Error al tratar de mostrar menu de bebidas ", error);
      }
    };
    fetchMenuBebidasItems();
    fetchMenuComidaItems();
  }, []);

  // obtener categorías únicas comida y bebidas para los select
  const categoriesComida = [
    "Todas",
    ...new Set(menuComidaItems.map((item) => item.category)),
  ];

  const categoriesBebidas = [
    "Todas",
    ...new Set(menuBebidasItems.map((item) => item.category)),
  ];

  const [selectedCategoryComida, setSelectedCategoryComida] = useState("Todas");
  const [selectedCategoryBebida, setSelectedCategoryBebida] = useState("Todas");

  const itemsFiltradosComida =
    selectedCategoryComida === "Todas"
      ? menuComidaItems
      : menuComidaItems.filter(
          (item) => item.category === selectedCategoryComida,
        );

  const itemsFiltradosBebida =
    selectedCategoryBebida === "Todas"
      ? menuBebidasItems
      : menuBebidasItems.filter(
          (item) => item.category === selectedCategoryBebida,
        );

  return (
    <div className=" min-h-screen p-6">
      <h1 className="font-serif text-yellow-400 text-2xl no-seleccionable">
        Comida 🥩🍝🍔🍕🥪
      </h1>
      {/* SELECT Comidas */}
      <select
        className="mb-6 p-2 bg-black border border-yellow-500 rounded"
        value={selectedCategoryComida}
        onChange={(e) => setSelectedCategoryComida(e.target.value)}
      >
        {categoriesComida.map((cat, index) => (
          <option key={index} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      {/* Contenedor Grid Responsivo: 1 col movil, 2 tablet, 3 escritorio  PARA COMIDAS*/}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {itemsFiltradosComida.map((item) => (
          <div
            key={item.id}
            className="bg-gray-950 rounded-3xl shadow-md overflow-hidden hover:shadow-lg shadow-amber-400 transition-shadow duration-300"
          >
            {/* Imagen del plato */}
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-56 object-cover"
            />

            <div className="p-5">
              {/* Etiqueta / Tag */}
              <span className="inline-block bg-black text-cyan-300 text-xs font-semibold px-3 py-1 rounded-full mb-3">
                {item.tag}
              </span>

              {/* Nombre y Precio */}

              <h2 className="text-xl font-bold text-amber-400">{item.name}</h2>

              {/* Descripción */}
              <p className="text-blue-50 text-sm mb-5">{item.description}</p>

              {/* Precio */}
              <span className="text-xl font-semibold text-green-600">
                {item.price}
              </span>
            </div>
          </div>
        ))}
      </div>
      <h1 className="mt-10 font-serif text-yellow-400 text-2xl no-seleccionable">
        Bebidas 🥤🧃🍸🍹
      </h1>
      {/* SELECT bebidas */}
      <select
        className="mt-6 p-2 bg-black border border-yellow-500 rounded"
        value={selectedCategoryBebida}
        onChange={(e) => setSelectedCategoryBebida(e.target.value)}
      >
        {categoriesBebidas.map((cat, index) => (
          <option key={index} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      {/* Contenedor Grid Responsivo: 1 col movil, 2 tablet, 3 escritorio  PARA BEBIDAS*/}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {itemsFiltradosBebida.map((item) => (
          <div
            key={item.id}
            className="bg-gray-950 rounded-3xl shadow-md overflow-hidden hover:shadow-lg shadow-amber-400 transition-shadow duration-300"
          >
            {/* Imagen del plato */}
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-56 object-cover"
            />

            <div className="p-5">
              {/* Etiqueta / Tag */}
              <span className="inline-block bg-black text-cyan-300 text-xs font-semibold px-3 py-1 rounded-full mb-3">
                {item.tag}
              </span>

              {/* Nombre y Precio */}

              <h2 className="text-xl font-bold text-amber-400">{item.name}</h2>

              {/* Descripción */}
              <p className="text-blue-50 text-sm mb-5">{item.description}</p>

              {/* Precio */}
              <span className="text-xl font-semibold text-green-600">
                {item.price}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
