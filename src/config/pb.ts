import PocketBase from "pocketbase";

const pb = new PocketBase(import.meta.env.VITE_API_URL);

function authenticate() {
  return (
    pb
      .collection("_superusers")
      // TODO : extraire dans .env
      .authWithPassword(
        import.meta.env.VITE_PB_USERNAME,
        import.meta.env.VITE_PB_PASSWORD,
      )
  );
}

export async function pbRequest() {
  await authenticate();
  return pb;
}

async function makeApi() {
  await authenticate();
  return pb;
}

export const pb = await makeApi();
