/* eslint-disable @typescript-eslint/no-explicit-any */

import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";

export const jsonify =
  ({
    stringifyBigNumbers = true,
    stringifyNumbers = true,
    nullifyUndefined = true,
  } = {}) =>
  <T>(x: any): T => {
    const formatter = (x: any): any => {
      try {
        if (x === null || (nullifyUndefined && x === undefined)) {
          return null;
        } else if (Array.isArray(x)) {
          return x.map((y) => formatter(y));
        } else if (stringifyBigNumbers && x instanceof BN) {
          return x.toString(10);
        } else if (x instanceof PublicKey) {
          return x.toString();
        } else if (stringifyNumbers && typeof x === "number") {
          return String(x);
        } else if (x && typeof x === "object") {
          const ob = Object.entries(x).reduce((acc, [k, v]) => {
            acc[k] = formatter(v);
            return acc;
          }, {} as any);

          return Object.keys(ob).sort().join(",") ===
            "length,negative,red,words"
            ? // it's probably a BN.js
              x.toString(10)
            : ob;
        }
      } catch (err) {
        console.error(err);
      }
      return x;
    };

    return formatter(x);
  };
