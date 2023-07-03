import { serve } from "std/http/server.ts";
import { KameleoonClient, KameleoonUtils } from "@kameleoon/nodejs-sdk";

const client = new KameleoonClient({ siteCode: "tndueuutdq" });

await client.initialize();

// --- Note ---
// Check SSE config update
client.onConfigurationUpdate(() => {
  console.log("UPDATE");
});

async function requestHandler(req: Request) {
  let res = new Response();

  const visitorCode = KameleoonUtils.getVisitorCode({
    request: req,
    response: res,
    domain: "localhost",
  });

  const variationKey = client.getFeatureFlagVariationKey(
    visitorCode,
    "ff_new_rules"
  );

  const experimentId = client.triggerExperiment(visitorCode, 136200);

  res = new Response(JSON.stringify({ variationKey, experimentId }, null, 2), {
    headers: res.headers,
  });

  return res;
}

serve(requestHandler);
