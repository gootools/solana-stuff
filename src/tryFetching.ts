/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * makes solana RPC requests, retries another provider on failure
 * based on weighting preferences
 * @param weightings key/value of object rpcUrl: weighting,
 * higher weighting = more likely to get picked
 * @returns rpc response object
 * @example
 * const rpcFetch = tryFetching({
 *  // twice as likely to use public RPC endpoint
 *  "https://api.mainnet-beta.solana.com": 2,
 *  "https://ssc-dao.genesysgo.net": 1,
 * })
 * const { result } = rpcFetch({ "method": "getLatestBlockhash" })
 */
export const tryFetching =
  (
    weightings: Record<string, number> = {
      "https://api.mainnet-beta.solana.com": 1,
    }
  ) =>
  async <K>(payload: any): Promise<{ result: K }> => {
    let endpoints = Object.entries(weightings).reduce(
      (acc: Array<string>, [url, weight]) => {
        for (let i = 0; i < weight; i++) {
          acc.push(url);
        }
        return acc;
      },
      []
    );

    let json;
    let url: string | undefined;

    while (!json && endpoints.length > 0) {
      try {
        url = endpoints.splice(
          Math.floor(Math.random() * endpoints.length),
          1
        )[0];

        endpoints = endpoints.filter((u) => u !== url);

        const requestPayload = {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            jsonrpc: "2.0",
            id: 1,
            ...payload,
          }),
        };

        debug({ url, requestPayload });

        const data = await fetch(url, requestPayload);
        json = await data.json();
        debug({ json });
        console.log(`success ${url}`);
      } catch (err) {
        console.error(`failed ${url}`);
      }
    }

    if (!json) {
      throw new Error(`invalid json: ${JSON.stringify({ payload, json })}`);
    } else {
      return json;
    }
  };

const debug = (...data: any) => {
  if (process.env.DEBUG) console.debug(data);
};
