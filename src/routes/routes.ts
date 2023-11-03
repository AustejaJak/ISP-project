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
  },
  company: {
    prefix: "/company",
    base: "/",
    register: "/sign-up",
    login: "/log-in",
    pending: "/pending",
    active: "/active",
    createProduct: "/create-product",
    product: "/product/:productId/edit",
  },
};

export default Routes;
