"use client"
import Image from 'next/image';
import Web3 from 'web3';
import { useEffect, useState } from 'react';

export default function Home() {
  const [account, setAccount] = useState<string>();
  const [balance, setBalance] = useState<string>();
  const web3 = typeof window !== 'undefined' && new Web3(window.ethereum);

  const abi = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "depositor",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "Deposit",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "recipient",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "Withdrawal",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "balances",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "deposit",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getBalance",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "withdraw",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]

  const contractAddress = "0xd9145CCE52D386f254917e481eB44e9943F39138";
  const contract = web3 && new web3.eth.Contract(abi, contractAddress);

  useEffect(() => {
    const fetchData = async () => {
      if (web3) {
        try {
          const accounts = await window.ethereum.request({
            method: 'eth_requestAccounts',
          });
          const currentAccount = accounts[0];
          setAccount(currentAccount);

          const contractBalance = await contract.methods.getBalance().call();
          setBalance(contractBalance);
        } catch (error) {
          console.error("Error getting balance:", error);
        }
      }
    };

    fetchData();
  }, [web3]);

  const connectWallet = async () => {
    try {
      if (typeof window.ethereum !== 'undefined') {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
        const currentAccount = accounts[0];
        setAccount(currentAccount);
        console.log(currentAccount);
      } else {
        alert('Please install MetaMask!');
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center mt-32 w-full h-full">
        <button onClick={connectWallet} className="w-32 h-auto rounded-lg bg-pink-500 text-white">Connect Wallet</button>
        <div className="flex flex-col gap-2">
          <p>Connected Account: {account}</p>
          <p>Current ETH Balance: {balance}</p>
          <input type="number" className="p-3 w-full h-16 rounded-lg border-2 border-gray-300" />
          <button className="w-full h-16 rounded-lg bg-yellow-500 text-white">Withdraw</button>
        </div>
      </div>
    </div>
  );
}

// import Image from 'next/image'
// import Web3 from 'web3'
// import { useEffect, useState } from'react'
// export default function Home() {
//   const [account, setAccount] = useState<string>()
//   const [balance, setBalance] = useState<string>()
//   const web3 = new Web3(Web3.givenProvider)

  // const abi = [
  //   {
  //     "inputs": [],
  //     "name": "deposit",
  //     "outputs": [],
  //     "stateMutability": "payable",
  //     "type": "function"
  //   },
  //   {
  //     "inputs": [],
  //     "stateMutability": "nonpayable",
  //     "type": "constructor"
  //   },
  //   {
  //     "anonymous": false,
  //     "inputs": [
  //       {
  //         "indexed": true,
  //         "internalType": "address",
  //         "name": "depositor",
  //         "type": "address"
  //       },
  //       {
  //         "indexed": false,
  //         "internalType": "uint256",
  //         "name": "amount",
  //         "type": "uint256"
  //       }
  //     ],
  //     "name": "Deposit",
  //     "type": "event"
  //   },
  //   {
  //     "inputs": [
  //       {
  //         "internalType": "uint256",
  //         "name": "amount",
  //         "type": "uint256"
  //       }
  //     ],
  //     "name": "withdraw",
  //     "outputs": [],
  //     "stateMutability": "nonpayable",
  //     "type": "function"
  //   },
  //   {
  //     "anonymous": false,
  //     "inputs": [
  //       {
  //         "indexed": true,
  //         "internalType": "address",
  //         "name": "recipient",
  //         "type": "address"
  //       },
  //       {
  //         "indexed": false,
  //         "internalType": "uint256",
  //         "name": "amount",
  //         "type": "uint256"
  //       }
  //     ],
  //     "name": "Withdrawal",
  //     "type": "event"
  //   },
  //   {
  //     "inputs": [
  //       {
  //         "internalType": "address",
  //         "name": "",
  //         "type": "address"
  //       }
  //     ],
  //     "name": "balances",
  //     "outputs": [
  //       {
  //         "internalType": "uint256",
  //         "name": "",
  //         "type": "uint256"
  //       }
  //     ],
  //     "stateMutability": "view",
  //     "type": "function"
  //   },
  //   {
  //     "inputs": [],
  //     "name": "getBalance",
  //     "outputs": [
  //       {
  //         "internalType": "uint256",
  //         "name": "",
  //         "type": "uint256"
  //       }
  //     ],
  //     "stateMutability": "view",
  //     "type": "function"
  //   },
  //   {
  //     "inputs": [],
  //     "name": "owner",
  //     "outputs": [
  //       {
  //         "internalType": "address",
  //         "name": "",
  //         "type": "address"
  //       }
  //     ],
  //     "stateMutability": "view",
  //     "type": "function"
  //   }
  // ];
  
//   const contractAddress = "0xd9145CCE52D386f254917e481eB44e9943F39138";
//   const contract = new web3.eth.Contract(abi, contractAddress);
//   console.log(contract);

//   contract.methods.getBalance()
//   .call()
//   .then(balance => {
//   setBalance(balance);
//   console.log(balance);
  
//   })
//   .catch(error => {
//     console.error("Error getting balance:", error);
//   });


//   const connecWallet = async () => {
//     if (typeof window.ethereum!== 'undefined') {
//       const accounts = await window.ethereum.request({
//         method: 'eth_requestAccounts',
//       });
//       const account = accounts[0];
//       setAccount(account);
//       console.log(account);
//     } else {
//       alert('Please install MetaMask!');
//     }
//   }
  
//   return (
//     <div>
//       {/* /create a Tailwind css input that accepts an amount, and a button to withdraw that amount */}

   
//       <div className="flex flex-col items-center justify-center mt-32  w-full h-full">
//       <button onClick={connecWallet} className="w-32 h-auto rounded-lg bg-pink-500 text-white">Connect Wallet</button>
//         <div className="flex flex-col gap-2">
//             <p>Connected Account: {account} </p>
//             <p>Current ETH Balance: {account} </p>
//             <input type="number" className="p-3 w-full h-16 rounded-lg border-2 border-gray-300" />
//             <button className="w-full h-16 rounded-lg bg-yellow-500 text-white">Withdraw</button>
            
//             </div>
//             </div>
           

//     </div>
//   )
// }
