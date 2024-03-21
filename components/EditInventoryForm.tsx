"use client";

import { useForm } from "react-hook-form";
import axios from "axios";
import { InventoryData, Inventory } from "@/types";

const EditInventoryForm = ({
  setInventories,
  id,
}: {
  setInventories: React.Dispatch<React.SetStateAction<Inventory[]>>;
  id: string;
}) => {
  const { register, handleSubmit } = useForm<InventoryData>();

  const onSubmit = (data: InventoryData) => {
    axios.patch(`/api/inventory/${id}`, data).then((response) => {
      setInventories((prevInventories) =>
        prevInventories.map((inventory) => (inventory._id === id ? response.data : inventory))
      );
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>name</label>
      <input type="text" {...register("name")} />
      <label>description</label>
      <input type="text" {...register("description")} />
      <label>quantity</label>
      <input type="number" {...register("quantity")} />
      <button type="submit">EDIT</button>
    </form>
  );
};
export default EditInventoryForm;
