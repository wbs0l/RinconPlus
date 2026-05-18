import { useEffect, useState } from "react";

function ProductsTable() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

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

      // se unifica ambos arrays
      const combinedProducts = [...foodData, ...drinksData];

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

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center py-20">
          {/* Spinner de carga personalizado con Tailwind CSS */}
          <div className="w-14 h-14 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin shadow-[0_0_15px_rgba(250,204,21,0.8)]"></div>
        </div>
      ) : (
        <table className="w-full text-sm  overflow-hidden rounded-2xl bg-[#111111] shadow-2xl border border-yellow-700/30 text-white">
          <thead className="bg-linear-to-r from-yellow-700/40 to-yellow-500/20 text-yellow-300">
            <tr>
              <th className="px-3 py-3 text-center font-semibold">Id</th>
              <th className="px-3 py-3 text-center font-semibold">Nombre</th>
              <th className="px-3 py-3 text-center font-semibold">
                Descripcion
              </th>
              <th className="px-3 py-3 text-center font-semibold">Precio</th>
              <th className="px-3 py-3 text-center font-semibold">
                Categoria_id
              </th>
              <th className="px-3 py-3 text-center font-semibold">
                Disponible
              </th>
              <th className="px-3 py-3 text-center font-semibold">
                Fecha de Creacion
              </th>
              <th className="px-3 py-3 text-center font-semibold">Tag</th>
            </tr>
          </thead>

          <tbody>
            {products.map((item) => (
              <tr
                key={item.id}
                className={`
              text-center
              transition-all duration-300
              hover:bg-yellow-500/5
              border-b border-yellow-700/10
              
            `}
              >
                <td className="px-2 py-3 text-gray-300 text-[0.9em]">
                  {item.id}
                </td>
                <td className="px-2 py-3 font-semibold text-white">
                  {item.name}
                </td>
                <td className="px-2 py-3 text-gray-400 text-[0.9em]">
                  {item.description}
                </td>
                <td className="px-2 py-3 text-yellow-300 font-semibold whitespace-nowrap">
                  $ {item.price}
                </td>
                <td className="px-2 py-3 text-gray-300">{item.category_id}</td>
                <td className="px-2 py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      item.avaliable
                        ? "bg-green-500/20 text-green-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {item.avaliable ? "Si" : "No"}
                  </span>
                </td>
                <td className="px-2 py-3 text-gray-500 text-xs whitespace-nowrap">
                  {item.created_at}
                </td>
                <td className="px-2 py-3">
                  <span className="bg-yellow-500/10 text-yellow-300 px-3 py-1 rounded-full text-sm">
                    {item.tag}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ProductsTable;
