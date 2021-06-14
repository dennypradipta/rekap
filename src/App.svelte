<script>
  import { Router, Route } from "svelte-routing";
  import Login from "./pages/Login.svelte";
  import Dashboard from "./pages/Dashboard.svelte";
  import ProtectedRoute from "./components/ProtectedRoute.svelte";
</script>

<main>
  <Router>
    <header>
      <h1>Rekap</h1>
    </header>
    <main>
      <Route path="/">
        <Login />
      </Route>
      <ProtectedRoute path="dashboard" component={Dashboard} />
    </main>
  </Router>
</main>
