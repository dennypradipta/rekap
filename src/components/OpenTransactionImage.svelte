<script>
    import SupabaseClient from "../config/supabase";

    export let image;

    async function downloadImage() {
        const file = image.split("/");
        try {
            let { data, error } = await SupabaseClient.storage
                .from("transactions")
                .createSignedUrl(file[1], 60);

            if (error) throw error;

            const { signedURL } = data;
            open(signedURL, "_blank");
        } catch (e) {
            console.log(e);
            alert(e);
        }
    }
</script>

<button on:click={downloadImage}>Image</button>
