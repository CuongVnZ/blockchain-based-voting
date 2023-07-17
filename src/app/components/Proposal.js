import { useEffect, useState } from "react";

const Proposal = ({ id, votingContract, address, web3 }) => {
  const [proposalInfo, setProposalInfo] = useState(null);
  const [resultProposal, setResult] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const proposal = await votingContract.methods.proposals(id).call();
      console.log("🚀 ~ file: Proposal.js:9 ~ fetchData ~ proposal:", proposal);
      setProposalInfo(proposal);

      const result = await votingContract.methods.resultProposal(id).call();
      console.log("🚀 ~ file: Proposal.js:9 ~ fetchData ~ result:", result)
      setResult(result);
    }

    const interval = setInterval(() => {
      fetchData();
    }, 2000);

    return () => clearInterval(interval);
  });

  async function handleVote(value) {
    await votingContract.methods.castVote(id, value).send({
      from: address,
    });
  }

  async function handleFinalize() {
    await votingContract.methods.finalizeProposal(id).send({
      from: address,
    });
  }

  return (
    <>
      {proposalInfo && (
        <div className="column is-3">
          <div className="card ">
            <header className="card-header">
              <p className="card-header-title">{id + 1}: {
                Number(resultProposal)==1 ? "Proposal accepted" : Number(resultProposal)==2 ?"Proposal denied":"In voting" 
              }</p>
            </header>
            <div className="card-content">
              <div className="content">
                <p>{proposalInfo.description}</p>
                <br />
                <p>{new Date(Number(proposalInfo.timestamp)*1000).toLocaleDateString()}</p>
              </div>
            </div>
            <footer className="card-footer">
              {proposalInfo.timestamp > Math.floor(new Date().getTime() / 1000) ? (
                <>
                  <button onClick={() => handleVote(true)} className="card-footer-item button is-primary mt-3 mr-5" >
                    Agree: {Number(proposalInfo.yesCount)}
                  </button>
                  <button onClick={() => handleVote(false)} className="card-footer-item button is-primary mt-3">
                    Disagree: {Number(web3.utils.fromWei(proposalInfo.noCount, "ether"))}
                  </button>
                </>
              ) : (
                <>
                  <button disabled={resultProposal!=0 ? true : false} onClick={handleFinalize} className="card-footer-item button is-primary">
                    Finallize
                  </button>
                </>
              )}
            </footer>
          </div>
        </div>
      )}
    </>
  );
};

export default Proposal;
