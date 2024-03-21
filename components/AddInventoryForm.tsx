"use client";

import { useForm } from "react-hook-form";
import axios from "axios";
import { InventoryData, Inventory } from "@/types";

const AddInventoryForm = ({
  setInventories,
}: {
  setInventories: React.Dispatch<React.SetStateAction<Inventory[]>>;
}) => {
  const { register, handleSubmit } = useForm<InventoryData>();

  const onSubmit = (data: InventoryData) => {
    axios.post("/api/inventory", data).then((response) => {
      setInventories((prevInventories) => [...prevInventories, response.data]);
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
      <button type="submit">SUBMIT</button>
    </form>
  );
};
export default AddInventoryForm;
