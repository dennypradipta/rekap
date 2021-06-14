<script>
    import SupabaseClient from "../config/supabase";

    export let categoryID;
    const fetchCategory = (async () => {
        try {
            let { data: category, error } = await SupabaseClient.from(
                "categories"
            )
                .select("*")

                // Filters
                .eq("id", categoryID);

            if (error) throw error;

            return category[0];
        } catch (e) {
            alert(e);
        }
    })();
</script>

{#await fetchCategory}
    <span>Loading...</span>
{:then data}
    <span>{data.category_name}</span>
{:catch error}
    <span>Category error!</span>
{/await}
