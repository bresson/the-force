export const starWarsAPI = (rootEndpoint, HTTPService) => {
  console.log(HTTPService, rootEndpoint);

  const getAllResourceEndpoints = async ({ endpoint = rootEndpoint } = {}) => {
    const { data: _endpoints } = await HTTPService.get({
      endpoint
    });
    return _endpoints;
  };

  const getSingleResource = async ({
    endpoint = rootEndpoint,
    resource
  } = {}) => {
    console.log("getSingleResource ", endpoint, " ", resource);
    const { data: _resource } = await HTTPService.get({
      endpoint,
      resource
    });
    return _resource;
  };

  return {
    getAllResourceEndpoints,
    getSingleResource
  };
};
