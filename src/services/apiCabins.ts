import axios from "axios";
import getURL from "../utils/globalConstants";
import {
  TCabinType,
  TCreateCabinType,
  UpdateCabinType,
} from "../schema/cabinSchema";

const URL: string = getURL();

// /* eslint-disable no-console */
export async function getCabins() {
  try {
    const URL: string = getURL();
    const response = await axios.get(`${URL}/cabins`, {
      withCredentials: true,
    });

    const data: TCabinType[] = response.data.cabins;
    console.log(data);
    return data;
  } catch (error) {
    throw new Error("Cabins could not be loaded");
  }
}

type CreateCabinResponseDataType = {
  status: string;
  cabin: TCabinType;
};

export async function createCabin(newCabin: TCreateCabinType) {
  try {
    // https://tcpnyutecqrpykcocbar.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg?t=2024-02-22T13%3A06%3A56.878Z

    // const imageName = `${Math.random()}-${newCabin.image?.name}`
    //   .replace(/\//g, "")
    //   .replace(" ", "");

    // const imagePath = `https://tcpnyutecqrpykcocbar.supabase.co/storage/v1/object/public/cabin-images/${imageName}`;

    console.log("new cabin : ", newCabin);
    const formData = new FormData();

    formData.append("name", newCabin.name);
    formData.append("maxCapacity", String(newCabin.maxCapacity));
    formData.append("regularPrice", String(newCabin.regularPrice));
    formData.append("discount", String(newCabin.discount));
    formData.append("description", String(newCabin.description));
    if (newCabin.image instanceof File || typeof newCabin.image === "string")
      formData.append("image", newCabin.image);

    const res = await axios.post<CreateCabinResponseDataType>(
      `${URL}/cabins`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      },
    );

    const data: CreateCabinResponseDataType = res.data;
    return data.cabin;
  } catch (error) {
    console.log(error);
    throw new Error("Cabin could not be created");
  }
}

export async function updateCabinAPI(updatedCabin: UpdateCabinType) {
  const URL = getURL();
  try {
    console.log("updatedCabin inside API", updatedCabin);

    const formData = new FormData();

    Object.keys(updatedCabin).forEach((fieldName) => {
      const field = fieldName as keyof UpdateCabinType;
      if (updatedCabin[field] !== undefined && field !== "image") {
        const value = updatedCabin[field] as string | Blob;
        formData.append(field, value);
      }
    });

    // formData.append("name", updatedCabin.name);
    // formData.append("maxCapacity", String(updatedCabin.maxCapacity));
    // formData.append("regularPrice", String(updatedCabin.regularPrice));
    // formData.append("discount", String(updatedCabin.discount));
    // if (updatedCabin.description !== undefined)
    //   formData.append("description", String(updatedCabin.description));
    if (updatedCabin.image instanceof File)
      formData.append("image", updatedCabin.image);

    console.log(formData);
    const res = await axios.patch<CreateCabinResponseDataType>(
      `${URL}/cabins/${updatedCabin.id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      },
    );

    console.log(res);
  } catch (error) {
    console.log(error);
    throw new Error("Cabin could not be updated");
  }
}

export async function deleteCabin(cabinId: number) {
  const URL = getURL();
  try {
    const res = await axios.delete(`${URL}/cabins/${cabinId}`, {
      withCredentials: true,
    });

    console.log(res);
    return res;
  } catch (error) {
    throw new Error("Cabin could not be deleted");
  }
}
