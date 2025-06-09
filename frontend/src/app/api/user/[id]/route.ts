'use server'

import axios from "axios";

const users = [
  {
    id: 1,
    name: "Alwin Mathew",
  },
  {
    id: 2,
    name: "Akhil Jose",
  },
];

interface userProps {
  params: {
    id: string;
  };
}
export async function GET(_request: Request, { params }: userProps) {
  const { id } = await params;

  try {
    const response = await axios.get(`https://67bef2f3b2320ee050120d2a.mockapi.io/users/${id}`);
    
    return new Response(JSON.stringify(response.data), {
      status: 200,
      headers: { 'Content-Type': 'application/json',    "Cache-Control": "no-store", // Prevents caching
      },
    });

  } catch (error: any) {
    if (error.response?.status === 404) {
      return new Response(JSON.stringify({ error: 'User not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json',    "Cache-Control": "no-store", // Prevents caching
        },
      });
    }

    console.error('API Error:', error.message);

    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}