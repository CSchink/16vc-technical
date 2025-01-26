import * as dotenv from "dotenv";
import * as Ably from "ably";
import { HandlerEvent } from "@netlify/functions";

dotenv.config();

export async function handler(event: HandlerEvent) {
  console.log(event);
  try {
    if (!process.env.ABLY_API_KEY) {
      return {
        statusCode: 500,
        headers: { "content-type": "application/json" },
        body: JSON.stringify(`Missing ABLY_API_KEY environment variable.`),
      };
    }

    const clientId =
      event.queryStringParameters?.["clientId"] ||
      process.env.DEFAULT_CLIENT_ID ||
      "NO_CLIENT_ID";
    const client = new Ably.Rest(process.env.ABLY_API_KEY);
    const tokenRequestData = await client.auth.createTokenRequest({
      clientId: clientId,
    });
    console.log(tokenRequestData);
    return {
      statusCode: 200,
      headers: { "content-type": "application/json" },
      body: JSON.stringify(tokenRequestData),
    };
  } catch (e) {
    console.log(e);
    return undefined;
  }
}
