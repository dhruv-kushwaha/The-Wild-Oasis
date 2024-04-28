export default interface CabinType {
  id: number;
  name: string;
  createdAt: Date;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description: string;
  image: string;
}

export type CreateUpdateCabinType = Omit<CabinType, "id" | "createdAt">;
