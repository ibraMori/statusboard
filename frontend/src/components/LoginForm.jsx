import { useState } from "react";

function LoginForm({ socket, onJoin }) {
    const [pseudo, setPseudo] = useState("");

    const handleSubmit = () => {
        const name = pseudo.trim();
        if (!name) return;

        socket.emit("user:join", { pseudo: name });
        onJoin(name);
    };

    return (
        <div className="login-page">
            <div className="login-card">
                <div className="login-logo">S</div>

                <h2>StatusBoard</h2>
                <p>Entrez votre nom pour rejoindre</p>

                <input
                    className="login-input"
                    value={pseudo}
                    onChange={(e) => setPseudo(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") handleSubmit();
                    }}
                    placeholder="Votre nom"
                />

                <button className="login-button" onClick={handleSubmit}>
                    Rejoindre →
                </button>
            </div>
        </div>
    );
}

export default LoginForm;