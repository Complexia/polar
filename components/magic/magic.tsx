import AuthModal from "../solana/auth-modal-one";

const Magic = () => {
    return (
        <div>
            <div className="mb-4">
                <article className="prose">
                    <h3>Authenticate using your web3 wallet</h3>

                </article>
            </div>

            <AuthModal />
        </div>
    )
}

export default Magic;