<script>
    import { Route } from "svelte-routing";
    import SupabaseClient from "../config/supabase";
    import AccessDenied from "../pages/AccessDenied.svelte";

    export let path;
    export let component;

    $: isAuthenticated = SupabaseClient.auth.user();
</script>

{#if isAuthenticated}
    <Route {path} {component} />
{:else}
    <Route {path} component={AccessDenied} />
{/if}
