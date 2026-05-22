import { useState, useEffect } from "react";

function DeleteProduct() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchAllData = async () => {
    setLoading(true);

    try {
      // se ejecuta fetch ambos simultaneamente
      const foodResponse = await fetch("https://rinconplus.onrender.com/food");
      const drinksResponse = await fetch(
        "https://rinconplus.onrender.com/drinks",
      );
      const foodData = await foodResponse.json();
      const drinksData = await drinksResponse.json();

      // se unifica ambos arrays
      const combinedData = [...foodData, ...drinksData];
      setProducts(combinedData);
    } catch (error) {
      console.error("Error obteniendo los datos del fetch:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  // se guarda el producto seleccionado y se muestra modal de confirmacion
  const handleConfirmClick = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  // elimina el producto
  const handleDelete = async () => {
    if (!selectedProduct) return;

    // aunque hay dos rutas diferentes se puede usar solo una aunque el seleccionado sea comida o bebida
    // esto sucede porque la consulta sql a la bbdd , la hace sobre la tabla productos y se define cual es el que elimina solo con el id capturado del front
    try {
      const response = await fetch(
        `https://rinconplus.onrender.com/drinks/${selectedProduct.id}`,
        {
          method: "DELETE",
        },
      );

      if (!response.ok) {
        throw new Error("Error al eliminar el producto");
      }

      // recarga las card
      fetchAllData();

      // cerrar modal
      setShowModal(false);
      setSelectedProduct(null);
    } catch (error) {
      console.error("Error eliminando producto:", error);
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
                onClick={() => handleConfirmClick(product)}
                className="mt-3 w-full bg-red-600 text-black py-2 rounded-lg font-semibold hover:bg-red-500"
              >
                Eliminar
              </button>
            </div>
          ))}
        </div>
      )}
      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-zinc-900 border border-yellow-500 rounded-xl p-6 w-[90%] max-w-md">
            <h2 className="text-white text-xl font-bold mb-4">
              Confirmar eliminación
            </h2>

            <p className="text-gray-300">
              ¿Seguro que deseas eliminar{" "}
              <span className="text-yellow-400 font-semibold">
                {selectedProduct?.name}
              </span>
              ?
            </p>

            <div className="flex gap-4 mt-6">
              <button
                onClick={handleDelete}
                className="flex-1 bg-red-600 hover:bg-red-500 text-white py-2 rounded-lg font-semibold"
              >
                Sí, eliminar
              </button>

              <button
                onClick={() => {
                  setShowModal(false);
                  setSelectedProduct(null);
                }}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg font-semibold"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DeleteProduct;
