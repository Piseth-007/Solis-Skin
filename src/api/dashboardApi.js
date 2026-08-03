import { getProducts } from "./productApi";
import { getCategories } from "./categoryApi";
import { getOrders } from "./orderApi";
import { getCustomers } from "./customerApi";

export async function getDashboardStats() {
  const [products, categories, orders, customers] = await Promise.all([
    getProducts(0, 100),
    getCategories(),
    getOrders(),
    getCustomers(),
  ]);

  // Spring Page<Product>
  const productList = products?.content || [];

  // Array responses
  const categoryList = Array.isArray(categories)
    ? categories
    : categories?.content || [];

  const orderList = Array.isArray(orders) ? orders : orders?.content || [];

  const customerList = Array.isArray(customers)
    ? customers
    : customers?.content || [];

  // Revenue
  const revenue = orderList.reduce(
    (sum, order) => sum + Number(order.totalAmount || 0),
    0,
  );

  // Top products
  const topProducts = [...productList]
    .sort((a, b) => (b.sold || 0) - (a.sold || 0))
    .slice(0, 5);

  // Monthly revenue
  const monthlyRevenue = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ].map((month, index) => {
    const total = orderList
      .filter((o) => {
        if (!o.createdAt) return false;
        return new Date(o.createdAt).getMonth() === index;
      })
      .reduce((sum, o) => sum + Number(o.totalAmount || 0), 0);

    return {
      month,
      revenue: total,
    };
  });

  return {
    products: products?.totalElements ?? productList.length,
    categories: categoryList.length,
    orders: orderList.length,
    customers: customerList.length,

    revenue,

    monthlyRevenue,

    recentOrders: [...orderList]
      .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
      .slice(0, 5),

    topProducts,
  };
}
