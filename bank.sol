// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.2 <0.9.0;

contract SavingsContract{
   address public  owner ;
    

    mapping (address=>uint) public  Users;
    uint public min  ;

    constructor(uint _min){
        owner= msg.sender;
        min=_min;
    }


    function depot() public payable {
       
        Users[msg.sender]+=msg.value;



    }

    function retrait() public payable {
         require(Users[msg.sender]>=min," depasse 5eth pour depot");
        require(msg.value<=Users[msg.sender],"vous avez pas ce montant dans votre compte");
        require(msg.value>0,"tu doit retrait plus de 0 eth");
        Users[msg.sender]-=msg.value;


    }
    function changeMin(uint _min)public {
        require(msg.sender==owner,"tu doit etre owner");
         min=_min;
    }





}