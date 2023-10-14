const MODULE_PATH = "inference-plugin/dist/module.js";

const initModel = async (product) =>
  new Promise(async (resolve) => {
    if (window.electronAPI) {
      window.electronAPI
        .invokePluginFunc(MODULE_PATH, "initModel", product)
        .then((res) => resolve(res));
    }
  });

const inferenceUrl = () => "http://localhost:3928/llama/chat_completion";

const stopModel = () => {
  window.electronAPI.invokePluginFunc(MODULE_PATH, "killSubprocess");
};

// Register all the above functions and objects with the relevant extension points
export function init({ register }) {
  register("initModel", "initModel", initModel);
  register("inferenceUrl", "inferenceUrl", inferenceUrl);
  register("stopModel", "stopModel", stopModel);
}