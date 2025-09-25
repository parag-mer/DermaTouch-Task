import fs from "fs";
import path from "path";
import { Product } from "./models/product";
import { Order } from "./models/order";

const DB_PATH = path.join(__dirname, "..", "data.json");

type DBShape = {
  users: Array<{ id: string; email: string; password: string }>;
  products: Product[];
  orders: Order[];
};

const defaultData: DBShape = {
  users: [],
  products: [],
  orders: [],
};

export function initializeData() {
  if (!fs.existsSync(DB_PATH)) {
    // create default file and copy the template bundled in repo root if exists,
    // otherwise create empty default.
    const rootTemplate = path.join(process.cwd(), "data.json");
    if (fs.existsSync(rootTemplate)) {
      fs.copyFileSync(rootTemplate, DB_PATH);
    } else {
      fs.writeFileSync(DB_PATH, JSON.stringify(defaultData, null, 2));
    }
  }
}

function readDB(): DBShape {
  const raw = fs.readFileSync(DB_PATH, "utf-8");
  return JSON.parse(raw) as DBShape;
}

function writeDB(data: DBShape) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

export const db = {
  getUsers: () => readDB().users,
  addUser: (user: { id: string; email: string; password: string }) => {
    const data = readDB();
    data.users.push(user);
    writeDB(data);
  },
  getProducts: (): Product[] => readDB().products,
  getProductById: (id: string) => readDB().products.find((p) => p.id === id),
  getOrders: (): Order[] => readDB().orders,
  addOrder: (order: Order) => {
    const data = readDB();
    data.orders.push(order);
    writeDB(data);
  },
  // optional: create product (not used by default)
  addProduct: (p: Product) => {
    const data = readDB();
    data.products.push(p);
    writeDB(data);
  },
};
