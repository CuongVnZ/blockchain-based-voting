import TokenContract from './abi/TokenContract.json'
import VotingContract from './abi/VotingContract.json'

export const tokenContractInstance = (web3) => {
    return new web3.eth.Contract(
        TokenContract, // abi of SC voting token
        "0x4E37E0fC6d36526986FA50734ED72036E59432c3" // address of Voting token
    )
}

export const votingContractInstance = web3 => {
    return new web3.eth.Contract(
        VotingContract, // abi of SC governance contract
        "0x659e0bf859c8d4B60A866fa1CA9E1b76a965Acea"  // address of governance contract
    )
}