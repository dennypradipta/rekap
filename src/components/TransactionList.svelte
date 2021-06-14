<script>
    import { onMount } from "svelte";
    import SupabaseClient from "../config/supabase";
    import CategoryName from "./CategoryName.svelte";
    import OpenTransactionImage from "./OpenTransactionImage.svelte";

    $: transactions = [];

    const fetchInitData = async () => {
        try {
            let { data, error } = await SupabaseClient.from(
                "transactions"
            ).select("*");

            if (error) throw error;

            return data;
        } catch (e) {
            alert(e);
        }
    };

    onMount(async () => {
        try {
            const data = await fetchInitData();
            transactions = data;

            // Subscribe to changes
            SupabaseClient.from("transactions")
                .on("*", (payload) => {
                    if (payload.new) {
                        transactions = [...transactions, payload.new];
                    }
                })
                .subscribe();
        } catch (e) {
            alert(e);
        }
    });
</script>

<style>
    table {
        margin-top: 16px;
        border-collapse: collapse;
    }
    th,
    td {
        padding: 1em;
    }
</style>

<table border="1">
    <thead>
        <th>Name</th>
        <th>Amount</th>
        <th>Description</th>
        <th>Category</th>
        <th>Image</th>
        <th>Created At</th>
    </thead>
    {#if transactions}
        {#each transactions as item}
            <tr>
                <td>{item.transaction_name}</td>
                <td>{item.amount}</td>
                <td>{item.description}</td>
                <td>
                    <CategoryName categoryID={item.category} />
                </td>
                <td>
                    {#if item.image}
                        <OpenTransactionImage image={item.image} />
                    {:else}<span>-</span>{/if}
                </td>
                <td>{item.createdAt}</td>
            </tr>
        {/each}
    {/if}
</table>
