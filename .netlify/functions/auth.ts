import * as dotenv from "dotenv";
import * as Ably from "ably";
import { HandlerEvent, HandlerContext } from "@netlify/functions";

dotenv.config();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default async function handler(event: HandlerEvent, _context: HandlerContext) {
  if (!process.env.ABLY_API_KEY) {
    return {
      statusCode: 500,
      headers: { "content-type": "application/json" },
      body: JSON.stringify(
        `Missing ABLY_API_KEY environment variable.`
      ),
    };
  }
  console.log(event);
  const clientId =
    event.queryStringParameters?.["clientId"] ||
    process.env.DEFAULT_CLIENT_ID ||
    "NO_CLIENT_ID";
  const client = new Ably.Rest(process.env.ABLY_API_KEY);
  const tokenRequestData = await client.auth.createTokenRequest({
    clientId: clientId,
  });
  return {
    statusCode: 200,
    headers: { "content-type": "application/json" },
    body: JSON.stringify(tokenRequestData),
  };
}
