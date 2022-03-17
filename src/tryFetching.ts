/* eslint-disable @typescript-eslint/no-explicit-any */

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

        const data = await fetch(url, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            jsonrpc: "2.0",
            id: 1,
            ...payload,
          }),
        });
        json = await data.json();
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
