import { serve } from "std/http/server.ts";
import { KameleoonClient, KameleoonUtils } from "@kameleoon/nodejs-sdk";

const client = new KameleoonClient({ siteCode: "tndueuutdq" });

await client.initialize();

async function requestHandler(request: Request) {
  // console.log(request);

  let response = new Response();

  // const visitorCode = KameleoonUtils.getVisitorCode({
  //   domain: "www.example.com",
  //   request,
  //   response,
  // });

  const visitorCode = "test";

  const variationKey = client.getFeatureFlagVariationKey(
    visitorCode,
    "ff_new_rules"
  );
  const experimentId = client.triggerExperiment(visitorCode, 136200);

  response = new Response(
    JSON.stringify({ variationKey, experimentId }, null, 2)
  );

  // const visitorCode = "test";

  return response;
}

serve(requestHandler);
