import TokenContract from './abi/TokenContract.json'
import VotingContract from './abi/VotingContract.json'

export const tokenContractInstance = (web3) => {
    return new web3.eth.Contract(
        TokenContract, // abi of SC voting token
        "0xF0A5133A84aB50519065eF081C82e9eC3904eb89" // address of Voting token
    )
}

export const votingContractInstance = web3 => {
    return new web3.eth.Contract(
        VotingContract, // abi of SC governance contract
        "0xCD4320770EA4BcbDC8dD78FFEBa0e9Ac5154BA10"  // address of governance contract
    )
}