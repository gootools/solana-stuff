import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import { jsonify } from "./jsonify";

const data = {
  StepAscQoEioFxxWGnh2sLBDFp9d8rvKz2Yp39iDpyT: {
    pubkey: new PublicKey("MangoCzJ36AjZyKwVj3VnYU4GTonjfVEnJmvvWaxLac"),
    account: {
      data: [],
      executable: false,
      lamports: 2930160,
      owner: "MangoCzJ36AjZyKwVj3VnYU4GTonjfVEnJmvvWaxLac",
      rentEpoch: 252,
    },
    info: {
      accountType: 5,
      governance: new PublicKey("MangoCzJ36AjZyKwVj3VnYU4GTonjfVEnJmvvWaxLac"),
      governingTokenMint: new PublicKey(
        "MangoCzJ36AjZyKwVj3VnYU4GTonjfVEnJmvvWaxLac"
      ),
      state: 6,
      tokenOwnerRecord: new PublicKey(
        "SRMuApVNdxXokk5GT7XD5cUUgXMBCoAz2LHeuAoKWRt"
      ),
      signatoriesCount: 1,
      signatoriesSignedOffCount: 1,
      descriptionLink: "https://example.com",
      name: "Some name",
      yesVotesCount: new BN(123),
      noVotesCount: new BN(456),
      draftAt: new BN(123456789),
      signingOffAt: new BN(0),
      votingAt: new BN(0),
      votingAtSlot: new BN(0),
      votingCompletedAt: undefined,
      executingAt: undefined,
      closedAt: new BN(0),
      instructionsExecutedCount: 0,
      instructionsCount: 1,
      instructionsNextIndex: 1,
      executionFlags: 0,
      maxVoteWeight: undefined,
      voteThresholdPercentage: undefined,
    },
  },
};

test("jsonify", () => {
  expect(jsonify()(data)).toEqual({
    StepAscQoEioFxxWGnh2sLBDFp9d8rvKz2Yp39iDpyT: {
      pubkey: "MangoCzJ36AjZyKwVj3VnYU4GTonjfVEnJmvvWaxLac",
      account: {
        data: [],
        executable: false,
        lamports: "2930160",
        owner: "MangoCzJ36AjZyKwVj3VnYU4GTonjfVEnJmvvWaxLac",
        rentEpoch: "252",
      },
      info: {
        accountType: "5",
        governance: "MangoCzJ36AjZyKwVj3VnYU4GTonjfVEnJmvvWaxLac",
        governingTokenMint: "MangoCzJ36AjZyKwVj3VnYU4GTonjfVEnJmvvWaxLac",
        state: "6",
        tokenOwnerRecord: "SRMuApVNdxXokk5GT7XD5cUUgXMBCoAz2LHeuAoKWRt",
        signatoriesCount: "1",
        signatoriesSignedOffCount: "1",
        descriptionLink: "https://example.com",
        name: "Some name",
        yesVotesCount: "123",
        noVotesCount: "456",
        draftAt: "123456789",
        signingOffAt: "0",
        votingAt: "0",
        votingAtSlot: "0",
        votingCompletedAt: null,
        executingAt: null,
        closedAt: "0",
        instructionsExecutedCount: "0",
        instructionsCount: "1",
        instructionsNextIndex: "1",
        executionFlags: "0",
        maxVoteWeight: null,
        voteThresholdPercentage: null,
      },
    },
  });
});
