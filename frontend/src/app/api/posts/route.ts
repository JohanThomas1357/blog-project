"use server";

import axios from "axios";

export async function GET(_request: Request) {
  try {
    const res = await axios.get(
      "https://67bef2f3b2320ee050120d2a.mockapi.io/posts"
    );
    return new Response(JSON.stringify(res.data));
  } catch(error) {
    return new Response(JSON.stringify({error:"failed to fetch posts"}))
  }
}
