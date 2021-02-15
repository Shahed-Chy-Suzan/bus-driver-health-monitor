export default function({ route, store, redirect }) {
  if (!route.matched.length) {
    return redirect(404, "/error");
  }
  // If user is not authenticated
  if (!store.getters["auth/auth"]) {
    store.commit("auth/purgeAuth");
    return redirect("/login");
  } else if (route.path === "/auth") {
    redirect("/");
  } else {
    redirect(route.query.next);
  }
}
