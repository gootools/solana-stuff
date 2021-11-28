import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";

export default ({
    stringifyBigNumbers = true,
    stringifyNumbers = true,
    nullifyUndefined = true,
  } = {}) =>
  <T>(x: any): T => {
    const formatter = (x) => {
      try {
        if (x === null || (nullifyUndefined && x === undefined)) {
          return null;
        } else if (Array.isArray(x)) {
          return x.map((y) => formatter(y));
        } else if (stringifyBigNumbers && x instanceof BN) {
          return x.toString();
        } else if (x instanceof PublicKey) {
          return x.toString();
        } else if (x && typeof x === "object") {
          return Object.entries(x).reduce((acc, [k, v]) => {
            acc[k] = formatter(v);
            return acc;
          }, {});
        } else if (stringifyNumbers && typeof x === "number") {
          return String(x);
        }
      } catch (err) {}
      return x;
    };

    return formatter(x);
  };
