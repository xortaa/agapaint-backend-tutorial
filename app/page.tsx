"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Inventory } from "@/types";
import AddInventoryForm from "../components/AddInventoryForm";
import EditInventoryForm from "@/components/EditInventoryForm";

export default function Home() {
  const [inventories, setInventories] = useState<Inventory[]>([]);

  useEffect(() => {
    axios.get("/api/inventory").then((response) => {
      setInventories(response.data);
    });
  }, []);

  const onDelete = (id: string) => {
    axios.delete(`/api/inventory/${id}`).then((response) => {
      setInventories((prevInventories) => prevInventories.filter((inventory) => inventory._id !== id));
    });
  };

  return (
    <div>
      <button onClick={() => console.log(inventories)}>CLICK ME</button>
      <h1>INVENTORY</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {inventories.map((inventory: Inventory) => (
            <tr>
              <td>{inventory._id}</td>
              <td>{inventory.name}</td>
              <td>{inventory.description}</td>
              <td>{inventory.quantity}</td>
              <td>
                <button onClick={() => onDelete(inventory._id)}>DELETE</button>
              </td>
              <td>
                <EditInventoryForm setInventories={setInventories} id={inventory._id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <AddInventoryForm setInventories={setInventories} />
    </div>
  );
}
