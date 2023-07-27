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
        "0x9e8f80F68930A8982F165d4B4001811F08253093"  // address of governance contract
    )
}