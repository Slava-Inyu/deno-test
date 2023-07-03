import { serve } from "std/http/server.ts";
import { KameleoonClient } from "@kameleoon/nodejs-sdk";

const client = new KameleoonClient({ siteCode: "tndueuutdq" });

await client.initialize();

client.onConfigurationUpdate(() => {
  console.log("UPDATE");
});

async function requestHandler(_: Request) {
  let response = new Response();

  const visitorCode = "test";

  const variationKey = client.getFeatureFlagVariationKey(
    visitorCode,
    "ff_new_rules"
  );
  const experimentId = client.triggerExperiment(visitorCode, 136200);

  response = new Response(
    JSON.stringify({ variationKey, experimentId }, null, 2)
  );

  return response;
}

serve(requestHandler);
