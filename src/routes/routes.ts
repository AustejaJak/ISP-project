const Routes = {
  backoffice: {
    prefix: "/backoffice",
    base: "/",
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
    newProducts: "/new/:productId",
    collection: "/collection/",
    collectionProduct: "/collection/:productId",
    checkout: "/checkout",
    shoppingBag: "/shopping-bag",
    orderHistory: "/order-history"
  },
  company: {
    prefix: "/company",
    base: "/",
    register: "/sign-up",
    login: "/log-in",
    pending: "/pending",
    active: "/active",
    createProduct: "/create-product",
  },
};

export default Routes;
