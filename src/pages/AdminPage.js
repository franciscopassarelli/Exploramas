import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa'; // Iconos de editar y eliminar
import { FaPlane } from 'react-icons/fa'; // Icono de avión para el loader
import { getAllProducts, addProduct, deleteProduct } from '../firebase/products'; // Asegúrate de que la ruta sea correcta



// Componente Loader con el avión giratorio
const Loader = () => (
  <div className="absolute inset-0 bg-black opacity-50 flex justify-center items-center z-50">
    <FaPlane className="animate-spin text-4xl text-white" />
  </div>
);

const AdminPage = () => {
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: null,
    duration: '',
    includes: [],
    rating: 0,
    image: ''
  });
  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false); // Estado para manejar el loader

  useEffect(() => {
    const fetchProducts = async () => {
      const productsFromFirebase = await getAllProducts();
      setProducts(productsFromFirebase);
    };
    fetchProducts();
  }, []);
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newValue = name === 'price' ? parseFloat(value) || 0 : value;
    setNewProduct((prevState) => ({ ...prevState, [name]: newValue }));
  };

  const handleImageChange = (e) => {
    const imageUrl = e.target.value; // Obtener la URL de la imagen ingresada
    setImagePreview(imageUrl); // Actualizar la vista previa con la URL ingresada
    setNewProduct((prevState) => ({ ...prevState, image: imageUrl })); // Guardar la URL en el estado
  };

  const validateForm = () => {
    const newErrors = {};
    if (!newProduct.name) newErrors.name = "El nombre del producto es obligatorio.";
    if (!newProduct.description) newErrors.description = "La descripción es obligatoria.";
    if (!newProduct.price || isNaN(newProduct.price) || newProduct.price <= 0) newErrors.price = "El precio debe ser un número positivo.";
    if (!newProduct.duration) newErrors.duration = "La duración es obligatoria.";
    if (!newProduct.image) newErrors.image = "Debes ingresar una URL de imagen.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleAddProduct = async () => {
    if (validateForm()) {
      setLoading(true);
      const includesArray = Array.isArray(newProduct.includes)
        ? newProduct.includes
        : newProduct.includes.split(',').map((item) => item.trim());
  
      const product = {
        ...newProduct,
        includes: includesArray,
      };
  
      const savedProduct = await addProduct(product);
      setProducts((prev) => [...prev, savedProduct]);
  
      // Limpieza
      setNewProduct({ name: '', description: '', price: null, duration: '', includes: [], rating: 0, image: '' });
      setImagePreview(null);
      setErrors({});
      setTimeout(() => setLoading(false), 1000);
    }
  };
  
  const handleDeleteProduct = async (productId) => {
    setLoading(true);
    await deleteProduct(productId);
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    setTimeout(() => setLoading(false), 1000);
  };
  

  const handleEditProduct = (productId) => {
    setLoading(true);  // Mostrar el loader al comenzar la acción

    const productToEdit = products.find((product) => product.id === productId);
    if (productToEdit) {
      const includes = Array.isArray(productToEdit.includes)
        ? productToEdit.includes.join(', ')
        : productToEdit.includes || '';

      setNewProduct({
        name: productToEdit.name,
        description: productToEdit.description,
        price: productToEdit.price,
        duration: productToEdit.duration,
        includes: includes,
        rating: productToEdit.rating,
        image: productToEdit.image,
      });

      setImagePreview(productToEdit.image);
      handleDeleteProduct(productId); // Eliminar el producto original antes de editarlo
    }

    setTimeout(() => setLoading(false), 1000); // Ocultamos el loader después de 1 segundo
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col relative">
      {/* Mostrar el loader si el estado loading es verdadero */}
      {loading && <Loader />}

      {/* Formulario para agregar producto */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Agregar Nuevo Producto</h3>
        <div className="space-y-4">
          <div>
            <input
              type="text"
              name="name"
              value={newProduct.name}
              placeholder="Nombre del producto"
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>
          <div>
            <textarea
              name="description"
              value={newProduct.description}
              placeholder="Descripción del producto"
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            />
            {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
          </div>
          <div>
            <input
              type="number"
              name="price"
              value={newProduct.price}
              placeholder="Precio"
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            />
            {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
          </div>
          <div>
            <input
              type="text"
              name="duration"
              value={newProduct.duration}
              placeholder="Duración"
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            />
            {errors.duration && <p className="text-red-500 text-sm">{errors.duration}</p>}
          </div>
          <div>
            <input
              type="text"
              name="includes"
              value={newProduct.includes}
              placeholder="Incluye (separado por coma)"
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
          <div>
  <input
    type="number"
    name="rating"
    value={newProduct.rating}
    placeholder="Calificación"
    onChange={(e) => {
      let value = parseInt(e.target.value);
      if (value < 1) value = 1;  // Limitar el mínimo a 1
      if (value > 6) value = 6;  // Limitar el máximo a 6
      setNewProduct((prevState) => ({ ...prevState, rating: value }));
    }}
    min="1"
    max="6"
    required
    className="w-full px-4 py-3 border border-gray-300 rounded-lg"
    onInvalid={(e) => e.target.setCustomValidity("La calificación debe ser entre 1 y 6")}
    onInput={(e) => e.target.setCustomValidity("")}  // Limpia el mensaje de error si el usuario corrige el input
  />
</div>

          </div>
          <div>
            <input
              type="text"
              name="image"
              value={newProduct.image}
              onChange={handleImageChange}
              placeholder="URL de la imagen"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            />
            {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}
          </div>

          {imagePreview && (
            <div className="mt-4">
              <p className="text-gray-600">Vista previa de la imagen:</p>
              <img src={imagePreview} alt="Vista previa" className="max-w-full h-auto mt-2 rounded-lg" />
            </div>
          )}

          <button
            onClick={handleAddProduct}
            className="w-full py-3 bg-gradient-to-r from-[#FF7C5D] to-[#FF5A38] text-white rounded-lg"
          >
            {loading ? <Loader /> : 'Agregar Producto'}
          </button>
        </div>
      </div>

      {/* Lista de productos */}
<div className="bg-white p-6 rounded-lg shadow-lg">
  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Productos Agregados</h3>
  {loading ? (
    <Loader />
  ) : (
    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {products.length > 0 ? (
        products.map((product) => (
          <div
            key={product.id}
            className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 bg-white shadow-lg rounded-lg p-4"
          >
            {/* Imagen y nombre del producto */}
            <div className="flex-shrink-0">
              <img
                src={product.image}
                alt={product.name}
                className="w-32 h-32 object-cover rounded-lg"
              />
            </div>
            <div className="flex-grow">
              <h3 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{product.description}</p>
              <div className="flex justify-between items-center text-gray-600 mb-2">
                <span className="text-sm">{product.duration}</span>
                <span className="font-semibold text-primary text-sm">${product.price}</span>
              </div>
              <div className="text-yellow-500 mb-2">
                {"★".repeat(Math.floor(product.rating))}
                <span className="text-gray-400 ml-1 text-sm">({product.rating})</span>
              </div>
              <p className="text-sm text-gray-600">
                {Array.isArray(product.includes) ? product.includes.join(', ') : 'No incluye información'}
              </p>
            </div>

            {/* Botones de editar y eliminar */}
            <div className="flex space-x-4">
              <button
                onClick={() => handleEditProduct(product.id)}
                className="p-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition-colors"
              >
                <FaEdit size={20} />
              </button>
              <button
                onClick={() => handleDeleteProduct(product.id)}
                className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
              >
                <FaTrashAlt size={20} />
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-600">No hay productos agregados aún.</p>
      )}
    </div>
  )}
</div>

    </div>
  );
};

export default AdminPage;
