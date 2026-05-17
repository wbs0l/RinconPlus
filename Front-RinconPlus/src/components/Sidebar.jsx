function Sidebar({ activeSection, setActiveSection }) {
  //solo se hace navegacion y se pasa al admin el item seleccionado con setActiveSection que fue pasado por parametro donde es llamado el componente
  const menuItems = [
    "Productos",
    "Crear",
    "Editar",
    "Eliminar",
    "Reservas",
    "Logout",
  ];
  return (
    <aside className="w-[35vw] md:w-[20vw] min-h-screen bg-black border-r border-yellow-500 p-5">
      <h2 className="text-2xl font-bold text-yellow-400 mb-10">Admin Panel</h2>

      <nav className="flex flex-col gap-4">
        {menuItems.map((item) => (
          <button
            key={item}
            onClick={() => setActiveSection(item)}
            className={`text-left cursor-pointer px-3 py-2 my-1.5 rounded-xl transition-all duration-300
              
              ${
                activeSection === item
                  ? "bg-yellow-600 text-black font-bold shadow-teal-300 shadow-lg"
                  : "bg-gray-900 text-white hover:bg-yellow-500 hover:text-black"
              }
            `}
          >
            {item}
          </button>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
