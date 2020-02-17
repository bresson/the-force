/**
 * @$httpLib : an async library or implement fetch
 * @tryCatch : a generic tryCatch to provide error flow
 * Base layer to integrate a HTTP library and generic tryCatch
 * Layer allows aggregation of 3rd libraries and
 * facilitates orthogonality in codebase : In future,
 * easily swap out tryCatch or $httpLib
 */

const HTTPService = ($httpLib, tryCatch) => {
  function sanityCheck(item) {
    return console.log("sanity check from HTTPService ", item);
  }

  async function get({ endpoint = "", resource = "" }) {
    console.log("get ", endpoint, " ", resource);

    return await tryCatch(
      $httpLib.get(`${endpoint}${resource.length ? resource : ""}`)
    );
  }

  function customRequest(data) {
    return tryCatch($httpLib(data));
  }
  return {
    sanityCheck,
    get,
    customRequest
  };
};

export default HTTPService;
