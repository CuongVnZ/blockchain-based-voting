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

  function isEnded() {
    return proposalInfo.timestamp < Math.floor(new Date().getTime() / 1000);
  }

  function getDate() {
    return new Date(Number(proposalInfo.timestamp)*1000).toLocaleDateString();
  }

  return (
    <>
      {proposalInfo && (
        <div className="column is-3">
          <div className="card ">
            <header className="card-header has-background-light">
              <p className="card-header-title">{id + 1}. {getDate()}</p>
            </header>
            <div className="card-content">
              <div className="content">
                <p>{proposalInfo.description}</p>
                <hr />
                <div className="is-flex-direction-row is-justify-content-space-between">
                {!isEnded() ? (
                <>
                  <button onClick={() => handleVote(true)} className="button is-success">
                    Agree: {Number(proposalInfo.yesCount)}
                  </button>
                  <button onClick={() => handleVote(false)} className="button is-danger">
                    Disagree: {Number(proposalInfo.noCount)}
                  </button>
                </>
                ) : (
                  <button onClick={handleFinalize} className="button is-info" disabled={isEnded()}>
                    Finialize
                  </button>
                )}
                </div>
              </div>
            </div>
            {isEnded() ? (
              resultProposal == 1 ? (
                <footer className="card-footer has-background-success-light">
                  <p className="card-footer-item has-text-success"> Proposal accepted </p>
                </footer>
              ) : (
                <footer className="card-footer has-background-danger-light">
                  <p className="card-footer-item has-text-danger"> Proposal denied </p>
                </footer>
              )
            ) : (
              <footer className="card-footer has-background-warning-light">
                <p className="card-footer-item"> In progressing </p>
              </footer>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Proposal;
