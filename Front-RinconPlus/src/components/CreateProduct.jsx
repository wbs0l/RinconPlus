import { useState } from "react";

function CreateProduct() {
  const categories = [
    { id: 1, name: "Hamburguesas", type: "food" },
    { id: 2, name: "Pastas", type: "food" },
    { id: 3, name: "Mexicana", type: "food" },
    { id: 4, name: "Ensaladas", type: "food" },
    { id: 5, name: "Bebidas Alcoholicas", type: "drink" },
    { id: 6, name: "Bebidas sin Alcohol", type: "drink" },
    { id: 7, name: "Postres", type: "food" },
    { id: 8, name: "Sopas", type: "food" },
    { id: 9, name: "Pizzas", type: "food" },
    { id: 10, name: "Pescados y Mariscos", type: "food" },
    { id: 11, name: "Comida Vegana", type: "food" },
    { id: 12, name: "Comida Vegetariana", type: "food" },
  ];

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    tag: "",
    category: "",
  });

  // se dispara en cada cambio del formulario
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const createProduct = async (e) => {
    e.preventDefault(); // previene el reinicio de la pagina

    const selectedCategory = categories.find(
      (cat) => cat.id === Number(formData.category),
    );

    // decidir endpoint según categoría
    const endpoint =
      selectedCategory.type === "drink"
        ? "https://rinconplus.onrender.com/drinks"
        : "https://rinconplus.onrender.com/food";

    const bodyData = {
      name: formData.name,
      description: formData.description,
      price: Number(formData.price),
      image: formData.image,
      tag: formData.tag,
      category: Number(formData.category),
    };

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyData),
      }); // el 2do parametro es la cabezera a enviar

      const data = await response.json();

      console.log(data);

      alert("Producto creado correctamente");

      setFormData({
        //reset del formData
        name: "",
        description: "",
        price: "",
        image: "",
        tag: "",
        category: "",
      });
    } catch (error) {
      console.error(error);
      alert("Error creando producto");
    }
  };

  return (
    <div className="w-full flex justify-center mt-10 px-5">
      <div className="w-full max-w-3xl bg-[#111111] border border-yellow-700/20 rounded-3xl shadow-2xl p-8">
        <h1 className="text-4xl font-bold text-yellow-400 mb-8 text-center">
          Crear Producto
        </h1>

        <form
          onSubmit={createProduct}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Nombre */}
          <div className="flex flex-col">
            <label className="text-yellow-300 mb-2">Nombre</label>

            <input
              type="text"
              name="name" // representara cada key del objeto
              value={formData.name} // servira para el valor de cada key
              onChange={handleChange}
              placeholder="Ej: Mojito Tropical"
              className="bg-[#1b1b1b] border border-yellow-700/20 rounded-xl px-4 py-3 text-white outline-none focus:border-yellow-400 transition-all"
            />
          </div>

          {/* Precio */}
          <div className="flex flex-col">
            <label className="text-yellow-300 mb-2">Precio</label>
            <div className="bg-[#1b1b1b] border border-yellow-700/20 rounded-xl px-4 py-3 flex items-center gap-2 focus-within:border-yellow-400 transition-all">
              <span className="text-gray-400 select-none">$</span>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="12"
                className="bg-transparent text-white outline-none w-full"
              />
            </div>
          </div>

          {/* Imagen */}
          <div className="flex flex-col md:col-span-2">
            <label className="text-yellow-300 mb-2">URL Imagen</label>

            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://imagen.com/producto.jpg"
              className="bg-[#1b1b1b] border border-yellow-700/20 rounded-xl px-4 py-3 text-white outline-none focus:border-yellow-400 transition-all"
            />
          </div>

          {/* Descripción */}
          <div className="flex flex-col md:col-span-2">
            <label className="text-yellow-300 mb-2">Descripción</label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              placeholder="Descripción del producto..."
              className="bg-[#1b1b1b] border border-yellow-700/20 rounded-xl px-4 py-3 text-white outline-none focus:border-yellow-400 transition-all resize-none"
            />
          </div>

          {/* Categoria */}
          <div className="flex flex-col">
            <label className="text-yellow-300 mb-2">Categoria</label>

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="bg-[#1b1b1b] border border-yellow-700/20 rounded-xl px-4 py-3 text-white outline-none focus:border-yellow-400 transition-all"
            >
              <option value="">Selecciona una categoria</option>

              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Tag */}
          <div className="flex flex-col">
            <label className="text-yellow-300 mb-2">Tag</label>

            <input
              type="text"
              name="tag"
              value={formData.tag}
              onChange={handleChange}
              placeholder="Ej: Popular"
              className="bg-[#1b1b1b] border border-yellow-700/20 rounded-xl px-4 py-3 text-white outline-none focus:border-yellow-400 transition-all"
            />
          </div>

          {/* Botón */}
          <div className="md:col-span-2 flex justify-center mt-4">
            <button
              type="submit"
              className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-10 py-3 rounded-2xl transition-all duration-300 shadow-lg hover:scale-105"
            >
              Crear Producto
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateProduct;
