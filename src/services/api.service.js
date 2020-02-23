import axios from "axios";

export const starWarsAPI = (rootEndpoint, HTTPService) => {
  console.log(HTTPService, rootEndpoint);

  const getEveryResourceEndpoint = async ({ endpoint = rootEndpoint } = {}) => {
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
    const { data: results } = await HTTPService.get({
      endpoint,
      resource
    });
    return results;
  };

  const getAllPagesOfResource = async ({
    endpoint = rootEndpoint,
    resource
  }) => {
    console.log("getting all pages from an asset ");
    /** Based on API & schema. Better */
    const perPageCount = 10;
    const _head = await getSingleResource({ endpoint, resource });
    const _additional = Math.ceil(_head.count / perPageCount); // Int 6, 7, 8, etc

    const _restPre = await axios.all(
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
