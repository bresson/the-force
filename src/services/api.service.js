import { store, mutations } from "@/ObservableStore";

export const starWarsAPI = (rootEndpoint, HTTPService) => {
  console.log(HTTPService, rootEndpoint);
  console.log("store ", store);

  const getEveryResourceEndpoint = async ({ endpoint = rootEndpoint } = {}) => {
    mutations.reducer("loading", true);
    const { data: _endpoints } = await HTTPService.get({
      endpoint
    });
    mutations.reducer("success", true);
    return _endpoints;
  };

  const getSingleResource = async ({
    endpoint = rootEndpoint,
    resource
  } = {}) => {
    console.log("getSingleResource ", endpoint, " ", resource);
    mutations.reducer("pending", true);
    const { data: results } = await HTTPService.get({
      endpoint,
      resource
    });
    mutations.reducer("success", true);
    return results;
  };

  const getAllPagesOfResource = async ({
    endpoint = rootEndpoint,
    resource
  }) => {
    mutations.reducer("loading", true);
    console.log("getting all pages from an asset ");
    /** Based on API & schema. Better */
    const perPageCount = 10;
    const _head = await getSingleResource({ endpoint, resource });
    const _additional = Math.ceil(_head.count / perPageCount); // Int 6, 7, 8, etc

    const _restPre = await HTTPService.getAll(
      range(2, _additional).map(page =>
        getSingleResource({
          resource: `${resource}?page=${page}`
        })
      )
    );

    const _rest = _restPre.reduce((acc, result) => {
      console.log(result);
      return [...acc, result];
    }, []);

    console.log("combo ", [_head, ..._rest]);
    mutations.reducer("success", true);
    return [_head, ..._rest];
  };

  /** Int, Int -> [Int, Int]
   * @start : Int
   * @end : Int
   * return an integer of integers
   * from @start to @end inclusive
   */
  const range = (start, end) => {
    const ranged = (current, end, acc) => {
      if (current > end) {
        return acc;
      }
      return ranged(current + 1, end, [...acc, current]);
    };
    return ranged(start, end, []);
  };

  const sanityCheck = async () => {
    return "OK";
  };

  return {
    getEveryResourceEndpoint,
    getSingleResource,
    sanityCheck,
    getAllPagesOfResource
  };
};
