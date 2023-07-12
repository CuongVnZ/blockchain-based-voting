import TokenContract from './abi/TokenContract.json'
import VotingContract from './abi/VotingContract.json'

export const tokenContractInstance = (web3) => {
    return new web3.eth.Contract(
        TokenContract, // abi of SC voting token
        "0x3B277929f70ad67d1bC171ad0986F210005cA9F1" // address of Voting token
    )
}

export const votingContractInstance = web3 => {
    return new web3.eth.Contract(
        VotingContract, // abi of SC governance contract
        "0x0dDb601973Bccd9C15b64502E21073cCdbD65344"  // address of governance contract
    )
}