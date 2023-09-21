import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { assert } from "chai";
import { ethers } from "hardhat";

describe("Contract", function () {
  async function deploy() {
    const Contract = await ethers.getContractFactory("Contract");
    return await Contract.deploy();
  }


  describe("Test", function () {
    it("Should be able to add a task", async function () {
      const contract = await loadFixture(deploy);
      const [owner, otherAccount] = await ethers.getSigners();

      assert(
        false,
        "Should be able to assert"
      );

    });
  });
});
