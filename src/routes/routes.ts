const Routes = {
  backoffice: {
    prefix: "/backoffice",
    base: "/",
    inventory: "/inventory",
    users: "/users",
    productsAdd: "/inventory/productsAdd",
  },
  client: {
    prefix: "/client",
    base: "/",
    register: "/sign-up",
    login: "/log-in",
    shop: "/shop",
    new: "/new",
    profile: "/profile",
    category: "/shop/:category",
    product: "/shop/:category/:productId",
    individualProduct: "/product/:productId",
    newProducts: "/new/:productId",
    collection: "/collection/",
    collectionProduct: "/collection/:productId",
    checkout: "/checkout",
    shoppingBag: "/shopping-bag",
    orderHistory: "/order-history",
    return: "/order-history/:orderId/return",
  },
  company: {
    prefix: "/company",
    base: "/",
    register: "/sign-up",
    login: "/log-in",
    pending: "/pending",
    active: "/active",
  },
};

export default Routes;
