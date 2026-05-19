import { useState, useEffect } from "react";

function EditProduct() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    tag: "",
    category_id: "",
    avaliable: true,
  });

  // obtener toda comida
  const fetchAllData = async () => {
    setLoading(true);

    try {
      // se ejecuta ambos fetch simultaneamente
      const [foodResponse, drinksResponse] = await Promise.all([
        fetch("https://rinconplus.onrender.com/food"),
        fetch("https://rinconplus.onrender.com/drinks"),
      ]);

      const foodData = await foodResponse.json();
      const drinksData = await drinksResponse.json();

      const foodWithType = foodData.map((item) => ({
        ...item,
        type: "food",
      }));

      const drinksWithType = drinksData.map((item) => ({
        ...item,
        type: "drinks",
      }));

      // se unifica ambos arrays
      const combinedProducts = [...foodWithType, ...drinksWithType];

      // actualizar el estado una vez
      setProducts(combinedProducts);
    } catch (error) {
      console.error("Error obteniendo productos :", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);
  // abrir modal y recibe todas las prop del producto seleccionado
  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image_url,
      tag: product.tag,
      category_id: product.category_id,
      avaliable: product.avaliable,
    });
  };

  // cambios inputs
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: name === "category_id" ? Number(value) : value,
    });
  };

  // guardar cambios
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // decidir endpoint
      const endpoint =
        selectedProduct.type === "food"
          ? `https://rinconplus.onrender.com/food/${selectedProduct.id}`
          : `https://rinconplus.onrender.com/drinks/${selectedProduct.id}`;

      const response = await fetch(endpoint, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Error actualizando producto");
      }

      alert("Producto actualizado");

      setSelectedProduct(null);
      fetchAllData();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-5">
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="w-14 h-14 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-black border border-yellow-500 rounded-xl p-3"
            >
              <div className="h-40 overflow-hidden rounded-lg">
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <h2 className="text-white font-bold mt-3">{product.name}</h2>

              <p className="text-yellow-400 text-sm">{product.tag}</p>

              <button
                onClick={() => handleEditClick(product)}
                className="mt-3 w-full bg-yellow-400 text-black py-2 rounded-lg font-semibold hover:bg-yellow-300"
              >
                Editar
              </button>
            </div>
          ))}
        </div>
      )}

      {/* MODAL */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
          <div className="bg-zinc-900 p-6 rounded-xl w-[500px] max-h-[90vh] overflow-y-auto">
            <form onSubmit={handleSubmit} className="space-y-3">
              <label className="text-yellow-300 mb-2">Nombre</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Nombre"
                className="w-full p-2 rounded"
              />

              <label className="text-yellow-300 mb-2">Descripción</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Descripcion"
                className="w-full p-2 rounded"
              />

              <label className="text-yellow-300 mb-2">Precio</label>
              <input
                type="text"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Precio"
                className="w-full p-2 rounded"
              />

              <label className="text-yellow-300 mb-2">Url Imagen</label>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="URL Imagen"
                className="w-full p-2 rounded"
              />

              <label className="text-yellow-300 mb-2">Tag</label>
              <input
                type="text"
                name="tag"
                value={formData.tag}
                onChange={handleChange}
                placeholder="Tag"
                className="w-full p-2 rounded"
              />

              <label className="text-yellow-300 mb-2">Category Id</label>
              <input
                type="number"
                name="category_id"
                value={formData.category_id}
                onChange={handleChange}
                placeholder="Category ID"
                className="w-full p-2 rounded"
              />

              <select
                name="avaliable"
                value={formData.avaliable.toString()}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    avaliable: e.target.value === "true",
                  })
                }
                className="w-full p-2 rounded bg-black"
              >
                <option value="true">Disponible</option>
                <option value="false">No disponible</option>
              </select>

              <div className="flex gap-3 pt-3">
                <button
                  type="submit"
                  className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-bold"
                >
                  Guardar
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedProduct(null)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default EditProduct;
