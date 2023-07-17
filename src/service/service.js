import TokenContract from './abi/TokenContract.json'
import VotingContract from './abi/VotingContract.json'

export const tokenContractInstance = (web3) => {
    return new web3.eth.Contract(
        TokenContract, // abi of SC voting token
        "0x5B5ADa93baCbd883092359aFb5eeFf587F87aC2b" // address of Voting token
    )
}

export const votingContractInstance = web3 => {
    return new web3.eth.Contract(
        VotingContract, // abi of SC governance contract
        "0x2C44E71dbBF76ad16194De5031F37E499Fa8a3E6"  // address of governance contract
    )
}