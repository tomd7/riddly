import PocketBase from "pocketbase";

const pbClient = new PocketBase(import.meta.env.VITE_API_URL);

function authenticate() {
  return pbClient
    .collection("_superusers")
    .authWithPassword(
      import.meta.env.VITE_PB_USERNAME,
      import.meta.env.VITE_PB_PASSWORD,
    );
}

async function makeApi() {
  await authenticate();
  return pbClient;
}

export const pb = await makeApi();
