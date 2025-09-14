import React, { useState } from "react";
import { Button } from "./Button";
import { InputText } from "./InputText";

export const Cart = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");

  const addItem = () => {
    if (!newItem.trim()) return;
    setItems([...items, { id: Date.now(), name: newItem }]);
    setNewItem("");
  };

  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div className="p-4 border rounded shadow w-96">
      <h2 className="text-xl font-bold mb-3">Giỏ hàng</h2>
      <div className="flex gap-2 mb-3">
        <InputText value={newItem} onChange={setNewItem} placeholder="Nhập sản phẩm..." />
        <Button onClick={addItem}>Thêm</Button>
      </div>
      <ul>
        {items.map(item => (
          <li key={item.id} className="flex justify-between mb-2">
            <span>{item.name}</span>
            <Button onClick={() => removeItem(item.id)} className="bg-red-500 hover:bg-red-600">Xóa</Button>
          </li>
        ))}
      </ul>
    </div>
  );
};
