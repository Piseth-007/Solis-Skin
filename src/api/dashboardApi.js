import { getProducts } from "./productApi";
import { getCategories } from "./categoryApi";
import { getOrders } from "./orderApi";
import { getCustomers } from "./customerApi";

export async function getDashboardStats() {
  const [products, categories, orders, customers] = await Promise.all([
    getProducts(),
    getCategories(),
    getOrders(),
    getCustomers(),
  ]);

  console.log("Products:", products);
  console.log("Categories:", categories);
  console.log("Orders:", orders);
  console.log("Customers:", customers);

  console.log("Is Orders Array?", Array.isArray(orders));

  return {
    products: Array.isArray(products) ? products.length : 0,
    categories: Array.isArray(categories) ? categories.length : 0,
    orders: Array.isArray(orders) ? orders.length : 0,
    customers: Array.isArray(customers) ? customers.length : 0,

    recentOrders: Array.isArray(orders) ? orders.slice(0, 5) : [],
  };
}
