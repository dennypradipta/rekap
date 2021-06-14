<script>
    import SupabaseClient from "../config/supabase";
    import TransactionList from "./TransactionList.svelte";

    let transaction_name, amount, description, category, image;
    let selected = 1;
    let categories = [
        { id: 1, category_name: "Apparel" },
        { id: 2, category_name: "Health" },
        { id: 3, category_name: "Food" },
        { id: 4, category_name: "Gift" },
        { id: 5, category_name: "Transportation" },
        { id: 6, category_name: "Household" },
    ];

    // Upload image
    let files;

    async function handleSubmit() {
        try {
            const authToken = window.localStorage.getItem(
                "supabase.auth.token"
            );
            const parsedAuthToken = JSON.parse(authToken);
            const user = parsedAuthToken.currentSession.user.id;

            if (
                !transaction_name ||
                !amount ||
                !description ||
                !category ||
                !user
            )
                throw Error("Invalid value for submitting the form");

            if (files) {
                const file = files[0];
                const fileExt = file.name.split(".");
                const fileName = `${fileExt[0]}_${Math.ceil(
                    Math.random() * 10000
                )}.${fileExt[1]}`;
                const filePath = `${fileName}`;
                console.log(filePath);

                let {
                    data: uploadData,
                    error: uploadError,
                } = await SupabaseClient.storage
                    .from("transactions")
                    .upload(filePath, file);

                image = uploadData.Key;
                if (uploadError) throw uploadError;
            }

            const { error } = await SupabaseClient.from("transactions").insert([
                {
                    transaction_name,
                    amount,
                    description,
                    category,
                    user,
                    image: image || "",
                },
            ]);

            if (error) throw error;

            transaction_name = "";
            amount = "";
            description = "";
            selected = 1;
            category = 1;
        } catch (e) {
            alert(e);
        }
    }
</script>

<style>
    form {
        display: grid;
        grid-column: auto;
    }
</style>

<main>
    <div class="sidebar">
        <form>
            <label for="transaction_name">Transaction Name</label>
            <input bind:value={transaction_name} name="transaction_name" />
            <label for="amount">Amount</label>
            <input bind:value={amount} name="amount" type="number" />
            <label for="description">Description</label>
            <textarea bind:value={description} name="description" />
            <label for="type">Type</label>
            <select
                bind:value={category}
                on:blur={(e) => {
                    selected = parseInt(e.target.value, 10);
                    category = parseInt(e.target.value, 10);
                }}>
                {#each categories as item}
                    <option value={item.id} selected={selected === item.id}>
                        {item.category_name}
                    </option>
                {/each}
            </select>
            <label for="Image">Image</label>
            <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                bind:files />
            <button
                on:click|preventDefault={handleSubmit}
                style="margin-top: 2em">Submit</button>
        </form>
    </div>
    <div class="content">
        <TransactionList />
    </div>
</main>
