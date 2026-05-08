import PocketBase from "pocketbase";

const pbClient = new PocketBase(import.meta.env.VITE_PB_URL);

async function makeApi() {
  return pbClient;
}

export const pb = await makeApi();
