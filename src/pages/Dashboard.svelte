<script>
    import { navigate } from "svelte-routing";

    import InputTransactionForm from "../components/InputTransactionForm.svelte";
    import SupabaseClient from "../config/supabase";

    async function handleLogout() {
        SupabaseClient.auth.signOut();
        navigate("/", { replace: true });
    }
</script>

<main>
    <button on:click={handleLogout} style="margin-bottom: 4em">Logout</button>
    <InputTransactionForm />
</main>
