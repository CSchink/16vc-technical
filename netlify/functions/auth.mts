import * as dotenv from "dotenv";
import * as Ably from "ably";
import { HandlerEvent } from "@netlify/functions";

dotenv.config();

exports.handler = async (event: HandlerEvent) => {
  try {
    if (!process.env.ABLY_API_KEY) {
      return new Response(
        JSON.stringify(`Missing ABLY_API_KEY environment variable.`),
        {
          headers: { "content-type": "application/json" },
        }
      );
    }
    const clientId =
      event.queryStringParameters?.["clientId"] ||
      process.env.DEFAULT_CLIENT_ID ||
      "NO_CLIENT_ID";
    const client = new Ably.Rest(process.env.ABLY_API_KEY);
    const tokenRequestData = await client.auth.createTokenRequest({
      clientId: clientId,
    });
    return new Response(JSON.stringify(tokenRequestData), {
      headers: { "content-type": "application/json" },
    });
  } catch (e) {
    console.log(e);
    return undefined;
  }
};
