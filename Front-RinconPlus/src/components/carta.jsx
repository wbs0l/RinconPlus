import { useState, useRef, useEffect } from "react";
import "../App.css";

export default function Carta() {
  const [menuComidaItems, setMenuComidaItems] = useState([]);
  const [menuBebidasItems, setMenuBebidasItems] = useState([]);
  const [loadingComida, setLoadingComida] = useState(true);
  const [loadingBebidas, setLoadingBebidas] = useState(true);

  useEffect(() => {
    // Simular fetch de datos (puedes reemplazar esto con una llamada real a una API)
    const fetchMenuComidaItems = async () => {
      try {
        setLoadingComida(true);
        const res = await fetch("https://rinconplus.onrender.com/food");
        const data = await res.json();
        setMenuComidaItems(data);
      } catch (error) {
        console.error("Error en el fetch de items de comida:", error);
      } finally {
        setLoadingComida(false);
      }
    };

    const fetchMenuBebidasItems = async () => {
      try {
        setLoadingBebidas(true);
        const res = await fetch("https://rinconplus.onrender.com/drinks");
        const data = await res.json();
        setMenuBebidasItems(data);
      } catch (error) {
        console.error("Error al tratar de mostrar menu de bebidas ", error);
      } finally {
        setLoadingBebidas(false);
      }
    };
    fetchMenuBebidasItems();
    fetchMenuComidaItems();
  }, []);

  const categoryMAPfood = {
    1: "Hamburguesas",
    2: "Pastas",
    3: "Mexicana",
    4: "Ensaladas",
    7: "Postres",
    8: "Sopas",
    9: "Pizzas",
    10: "Pescados y Mariscos",
    11: "Comida Vegana",
    12: "Comida Vegetariana",
  };

  // obtener categorías únicas comida y bebidas para los select
  const categoriesComida = [
    "Todas",
    ...new Set(
      menuComidaItems.map((item) => categoryMAPfood[item.category_id]),
    ),
  ];

  const categoryMAP = {
    5: "Alcoholicas",
    6: "No Alcoholicas",
    7: "Calientes",
    8: "Frías",
  };
  const categoriesBebidas = [
    "Todas",
    ...new Set(menuBebidasItems.map((item) => categoryMAP[item.category_id])),
  ];

  const [selectedCategoryComida, setSelectedCategoryComida] = useState("Todas");
  const [selectedCategoryBebida, setSelectedCategoryBebida] = useState("Todas");

  const itemsFiltradosComida =
    selectedCategoryComida === "Todas"
      ? menuComidaItems
      : menuComidaItems.filter(
          (item) =>
            categoryMAPfood[item.category_id] === selectedCategoryComida, // se hace el filtro comparando la categoria seleccionada con la categoria del item, usando el categoryMAP para obtener el nombre de la categoria a partir del category_id del item
        );

  const itemsFiltradosBebida =
    selectedCategoryBebida === "Todas"
      ? menuBebidasItems
      : menuBebidasItems.filter(
          (item) => categoryMAP[item.category_id] === selectedCategoryBebida,
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
        {loadingComida ? (
          <div className="flex col-span-full justify-center items-center py-20">
            {/* Spinner de carga personalizado con Tailwind CSS */}
            <div className="w-14 h-14 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin shadow-[0_0_15px_rgba(250,204,21,0.8)]"></div>
          </div>
        ) : (
          itemsFiltradosComida.map((item) => (
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

                {/* Nombre  */}

                <h2 className="text-xl font-bold text-amber-400">
                  {item.name}
                </h2>

                {/* Descripción */}
                <p className="text-blue-50 text-sm mb-5">{item.description}</p>

                {/* Precio */}
                <span className="text-xl font-semibold text-green-600">
                  $ {item.price}
                </span>
              </div>
            </div>
          ))
        )}
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
        {loadingBebidas ? (
          <div className="flex col-span-full justify-center items-center py-20">
            {/* Spinner de carga personalizado con Tailwind CSS */}
            <div className="w-14 h-14 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin shadow-[0_0_15px_rgba(250,204,21,0.8)]"></div>
          </div>
        ) : (
          itemsFiltradosBebida.map((item) => (
            <div
              key={item.id}
              className="bg-gray-950  rounded-3xl shadow-md overflow-hidden hover:shadow-lg shadow-amber-400 transition-shadow duration-300"
            >
              {/* Imagen del plato */}
              <div className="w-full h-56 flex items-center justify-center overflow-hidden mt-5">
                <img
                  src={item.image_url}
                  alt={item.name}
                  className="max-h-full object-contain rounded-2xl"
                />
              </div>

              <div className="p-5">
                {/* Etiqueta / Tag */}
                <span className="inline-block bg-black text-cyan-300 text-xs font-semibold px-3 py-1 rounded-full mb-3">
                  {item.tag}
                </span>

                {/* Nombre y Precio */}

                <h2 className="text-xl font-bold text-amber-400">
                  {item.name}
                </h2>

                {/* Descripción */}
                <p className="text-blue-50 text-sm mb-5">{item.description}</p>

                {/* Precio */}
                <span className="text-xl font-semibold text-green-600">
                  $ {item.price}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
