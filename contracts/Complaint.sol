pragma solidity ^0.4.22;
contract owned{
    address public owner;
    constructor() public{
        owner = msg.sender;
    }
    modifier ownerOnly(){
        require(msg.sender==owner);
        _;
    }
}

contract Complaint is owned
{
   
    struct complaint
    {
        address creator;
        bytes32 name;
        bytes32 rollno;
        uint256 cat;
        uint256 sub_cat;
        uint256 date ;
        bytes32  complaint;
        bool accepted;
        bool closed;
    
    }
    
    complaint[] public arr;
    
    modifier creatorOnly(uint256 index){
        require(arr[index].creator==msg.sender);
        _;
    }
    mapping(uint256=>mapping(uint256=>address)) public judge;
    mapping(uint256=>mapping(uint256=>string)) public judgeName;
    
    modifier judgeOnly(uint256 cat,uint256 scat){
        require(msg.sender==judge[cat][scat]);
        _;
    }
    
    
    function setJugde(uint256 cat,uint256 scat,address addr,string name) public ownerOnly returns(bool){
        judge[cat][scat] = addr;
        judgeName[cat][scat]=name;
        return true;
    }
  function registerComplaint(bytes32 name,bytes32 rln,uint256 cat,uint256 scat,uint256 dt,bytes32 s) public returns(bool)
  {
      arr.push(complaint({
          creator:msg.sender,
          name:name,
          rollno:rln,
          cat:cat,
          sub_cat:scat,
          date:dt,
          complaint:s,
          accepted:false,
          closed:false
      }));
      return true;
      
  }
  
  
  function getValuesByIndex(uint256 index ) public view  returns(address,bytes32,bytes32,uint256,uint256,uint256,bytes32,bool,bool)
  {
      
      complaint storage founded = arr[index];
      return(founded.creator,founded.name,founded.rollno,founded.cat,founded.sub_cat,founded.date,founded.complaint,founded.accepted,founded.closed);
      
  }
  function getAllValuesCreators() public view returns(address[],bytes32[],bytes32[]){
      address[] memory creators = new address[](arr.length); 
      bytes32[] memory names = new bytes32[](arr.length);
      bytes32[] memory rollnos = new bytes32[](arr.length);
      
        for (uint i = 0; i < arr.length; i++) {
            complaint storage comp = arr[i];
            creators[i]=comp.creator;
            names[i]=comp.name;
            rollnos[i]=comp.rollno;
           
        
        }
      return(creators,names,rollnos);
  }
  function getAllValuesComplaints() public view returns(uint256[],uint256[],uint256[],bytes32[],bool[],bool[]){
      uint256[] memory cats = new uint256[](arr.length);
      uint256[] memory scats = new uint256[](arr.length);
      uint256[] memory dates = new uint256[](arr.length);
      bytes32[] memory complaints = new bytes32[](arr.length);
      bool[] memory accepteds = new bool[](arr.length);
      bool[] memory closeds = new bool[](arr.length);
        for (uint i = 0; i < arr.length; i++) {
            complaint storage comp = arr[i];
            cats[i] = comp.cat;
            scats[i] = comp.sub_cat;
            dates[i] = comp.date;
            complaints[i] = comp.complaint;
            accepteds[i]=comp.accepted;
            closeds[i]=comp.closed;
        
        }
      return(cats,scats,dates,complaints,accepteds,closeds);
  }
//   Judges Function
    function acceptComplaint(uint256 index) public judgeOnly(arr[index].cat,arr[index].sub_cat) returns(bool){
        arr[index].accepted= true;
        return true;
    }
    function closeComplaint(uint256 index) public judgeOnly(arr[index].cat,arr[index].sub_cat) returns(bool){
        arr[index].closed= true;
        return true;
    }
     
}