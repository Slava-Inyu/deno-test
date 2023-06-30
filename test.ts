import { assertEquals } from "std/testing/asserts.ts";
import { KameleoonClient } from "@kameleoon/nodejs-sdk";

const visitorCode = "test";
const featureKey = "ff_new_rules";
const experimentId = 136200;

const client = new KameleoonClient({ siteCode: "tndueuutdq" });
await client.initialize();

Deno.test({
  name: "getFeatureFlagVariationKey",
  fn: () => {
    const variationKey = client.getFeatureFlagVariationKey(
      visitorCode,
      featureKey
    );

    assertEquals(variationKey, "on");
  },
  sanitizeOps: false,
  sanitizeResources: false,
});

Deno.test({
  name: "triggerExperiment",
  fn: () => {
    const variationId = client.triggerExperiment(visitorCode, experimentId);

    assertEquals(variationId, 617899);
  },
  sanitizeOps: false,
  sanitizeResources: false,
});

Deno.test({
  name: "getExperiments",
  fn: () => {
    const experiments = client.getExperiments();

    const expectedExperiments = [
      { id: 136200, name: "Mobile SDK Server_Side_Only" },
      { id: 136204, name: "Mobile SDK Hybrid" },
      { id: 136215, name: "Mobile SDK Test_Targeting_Custom_Data" },
      { id: 136223, name: "Mobile SDK Test_With_Multiple_Conditions" },
      { id: 136226, name: "Mobile SDK Multi_Variation_Test" },
      { id: 146968, name: "Test RespoolTime Experiment" },
      { id: 157303, name: "Mobile SDK Experiment Ruby" },
      { id: 161914, name: "Exclusive Experiment" },
      { id: 162109, name: "Experiment Targeted Condition" },
      { id: 162338, name: "Experiment Any Condition" },
    ];

    assertEquals(expectedExperiments, experiments);
  },
});

Deno.test({
  name: "getFeatureFlags",
  fn: () => {
    const featureFlags = client.getFeatureFlags();

    const expectedFeatureFlags = [
      { id: 103, key: "complextargeting" },
      { id: 104, key: "test_feature_variables" },
      { id: 135, key: "testff" },
      { id: 137, key: "complextargeting_2" },
      { id: 153, key: "test_first_level_or_operator" },
      { id: 154, key: "copy_test_first_level_or_operator" },
      { id: 155, key: "copy_copy_test_first_level_or_operator" },
      { id: 156, key: "copy_copy_copy_test_first_level_or_operator" },
      { id: 158, key: "test_segment_lower_greater" },
      {
        id: 163,
        key: "feature_flag_can_change_segment__no_tests_for_this_ff_",
      },
      { id: 232, key: "feature_flag_multi_environment_test" },
      { id: 243, key: "test_pagination_1" },
      { id: 244, key: "test_pagination_2" },
      { id: 245, key: "test_pagination_3_" },
      { id: 246, key: "test_pagination_4" },
      { id: 247, key: "test_pagination_5" },
      { id: 248, key: "test_pagination_6" },
      { id: 249, key: "test_pagination_7" },
      { id: 250, key: "test_pagination_8" },
      { id: 251, key: "test_pagination_9" },
      { id: 252, key: "test_pagination_10" },
      { id: 253, key: "test_pagination_11" },
      { id: 254, key: "test_pagination_12" },
      { id: 299, key: "feature_flag_test_real_time_configuration_service" },
      { id: 349, key: "feature_flag_liga_stavok" },
      { id: 1118, key: "ff_new_rules" },
    ];

    assertEquals(expectedFeatureFlags, featureFlags);
  },
});

// Deno.test({
//   name: "getVisitorExperiments",
//   fn: () => {
//     const visitorExperiments = client.getVisitorExperiments(visitorCode);

//   },
// });
