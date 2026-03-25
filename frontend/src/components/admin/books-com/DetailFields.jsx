const DetailFields = ({ formData, categories, handleChange }) => {
  return (
    <div className="flex-1 flex flex-col gap-3">
      {["name", "author", "price"].map((field) => (
        <div key={field} className="flex flex-col">
          <label className="capitalize font-medium">
            {field === "name" ? "Нэр" : field === "author" ? "Зохиолч" : "Үнэ"}
          </label>
          <input
            name={field}
            value={formData[field]}
            onChange={handleChange}
            className="border p-2 rounded focus:outline-indigo-500"
          />
        </div>
      ))}

      <label className="font-medium">Категори</label>
      <select
        name="category"
        value={formData.category}
        onChange={handleChange}
        className="border p-2 rounded"
      >
        <option value="">Сонгох...</option>
        {categories.map((cat) => (
          <option key={cat._id} value={cat._id}>
            {cat.name}
          </option>
        ))}
      </select>

      <label className="font-medium">Тайлбар</label>
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        className="h-32 border p-2 rounded focus:outline-indigo-500"
      />
    </div>
  );
};

export default DetailFields;
