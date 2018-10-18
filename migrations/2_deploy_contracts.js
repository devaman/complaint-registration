var SimpleStorage = artifacts.require("./SimpleStorage.sol");
var Complaint = artifacts.require("./Complaint.sol");


module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
  deployer.deploy(Complaint);
};
