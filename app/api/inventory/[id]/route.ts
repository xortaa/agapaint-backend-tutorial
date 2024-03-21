import connectToDatabase from "@/utils/database";
import Inventory from "@/models/inventory";
import { NextRequest, NextResponse } from "next/server";

// single inventory get
export const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {
  const id = params.id;
  
  try {
    await connectToDatabase();
    const inventory = await Inventory.findById(id);
    if (!inventory) {
      return NextResponse.json("Inventory not found", { status: 404 });
    }
    return NextResponse.json(inventory, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("Failed to get inventory", { status: 500 });
  }
};

export const PATCH = async (req: NextRequest, { params }: { params: { id: string } }) => {
  const inventoryData = await req.json();
  const id = params.id;
  try {
    await connectToDatabase();
    const updatedInventory = await Inventory.findByIdAndUpdate(id, inventoryData, { new: true });
    if (!updatedInventory) {
      return NextResponse.json("Inventory not found", { status: 404 });
    }
    return NextResponse.json(updatedInventory, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("Failed to update inventory", { status: 500 });
  }
};

export const DELETE = async (req: NextRequest, { params }: { params: { id: string } }) => {
  const id = params.id;
  try {
    await connectToDatabase();
    const deletedInventory = await Inventory.findByIdAndDelete(id);
    if (!deletedInventory) {
      return NextResponse.json("Inventory not found", { status: 404 });
    }
    return NextResponse.json(deletedInventory, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("Failed to delete inventory", { status: 500 });
  }
};
