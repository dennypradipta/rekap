<script>
    import { onMount } from "svelte";

    import { navigate } from "svelte-routing";

    import SupabaseClient from "../config/supabase";

    onMount(() => {
        const isAuthenticated = SupabaseClient.auth.user();
        if (isAuthenticated) {
            navigate("/dashboard");
        }
    });

    let email, password;
    async function handleLogin() {
        try {
            let { error } = await SupabaseClient.auth.signIn({
                email,
                password,
            });

            if (error) throw error;

            window.location.assign("/dashboard");
        } catch (e) {
            alert(e);
        }
    }
</script>

<form>
    <label for="email">Email</label>
    <input bind:value={email} name="email" />
    <label for="password">Password</label>
    <input bind:value={password} name="password" type="password" />
    <button on:click|preventDefault={handleLogin}>Login</button>
</form>
