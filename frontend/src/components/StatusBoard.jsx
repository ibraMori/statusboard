import { useState } from "react";
import MemberCard from "./MemberCard.jsx";

function StatusBoard({ socket, currentUser, members, events, connected }) {
    const [viewMode, setViewMode] = useState("grid");

    const changeStatus = (status) => {
        socket.emit("status:change", { status });
    };

    const countStatus = (status) => {
        return members.filter((m) => m.status === status).length;
    };

    const getStatusClass = (status) => {
        if (status === "En ligne") return "en-ligne";
        if (status === "Absent") return "absent";
        if (status === "Occupé") return "occupe";
        return "";
    };

    return (
        <div className="dashboard">
            <header className="topbar">
                <div className="brand">
                    <div className="logo">S</div>
                    <h1>StatusBoard</h1>
                    <span>{members.length} en ligne</span>
                </div>

                <div className="connected-user">
                    Connecté <strong>{currentUser}</strong>
                </div>
            </header>

            <div className="layout">
                <aside className="sidebar">
                    <h3>STATUTS</h3>

                    <div className="stat-row">
                        <div>
                            <span className="dot en-ligne"></span>
                            En ligne
                        </div>
                        <strong>{countStatus("En ligne")}</strong>
                    </div>

                    <div className="stat-row">
                        <div>
                            <span className="dot absent"></span>
                            Absent
                        </div>
                        <strong>{countStatus("Absent")}</strong>
                    </div>

                    <div className="stat-row">
                        <div>
                            <span className="dot occupe"></span>
                            Occupé
                        </div>
                        <strong>{countStatus("Occupé")}</strong>
                    </div>

                    <div className="total-row">
                        <span>Total</span>
                        <strong>{members.length}</strong>
                    </div>

                    <div className="socket-state">
                        <span className={connected ? "dot en-ligne" : "dot occupe"}></span>
                        {connected ? "Socket.io connecté" : "Socket.io déconnecté"}
                    </div>
                </aside>

                <main className="main-content">
                    <div className="section-header">
                        <h2>Membres connectés</h2>

                        <div className="view-buttons">
                            <button
                                className={viewMode === "grid" ? "active" : ""}
                                onClick={() => setViewMode("grid")}
                            >
                                Grille
                            </button>

                            <button
                                className={viewMode === "list" ? "active" : ""}
                                onClick={() => setViewMode("list")}
                            >
                                Liste
                            </button>
                        </div>
                    </div>

                    <div className={`members-container ${viewMode}`}>
                        {members.map((member) => (
                            <MemberCard
                                key={member.id}
                                member={member}
                                currentUser={currentUser}
                                onChangeStatus={changeStatus}
                                viewMode={viewMode}
                            />
                        ))}
                    </div>

                    <section className="history-box">
                        <h2>Historique des événements</h2>

                        {events.map((event, index) => (
                            <div className="event-row" key={index}>
                                <div>
                                    <span className={`dot ${getStatusClass(event.status)}`}></span>
                                    {event.text}
                                </div>
                                <span>{event.time}</span>
                            </div>
                        ))}
                    </section>
                </main>
            </div>
        </div>
    );
}

export default StatusBoard;