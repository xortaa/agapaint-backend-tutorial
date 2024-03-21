import connectToDatabase from "@/utils/database";
import Inventory from "@/models/inventory";
import { NextRequest, NextResponse } from "next/server";

// localhost:3000/api/inventory 

// get request
export const GET = async (req: NextRequest) => {
  try {
    await connectToDatabase();

    const inventories = await Inventory.find({});

    return NextResponse.json(inventories, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("Failed to get inventories", { status: 500 });
  }
};

// post request
// req type is NextRequest
export const POST = async (req: NextRequest) => {
  // wait for request json then assign it to inventoryData
  const inventoryData = await req.json();
  
  try {
    await connectToDatabase();
    const newInventory = new Inventory(inventoryData);
    // syntax for saving
    await newInventory.save();
    return NextResponse.json(newInventory, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("Failed to create inventory", { status: 500 });
  }
};
