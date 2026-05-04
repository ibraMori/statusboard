function MemberCard({ member, currentUser, onChangeStatus, viewMode }) {
    const isCurrentUser = member.name === currentUser;

    const getStatusClass = (status) => {
        if (status === "En ligne") return "en-ligne";
        if (status === "Absent") return "absent";
        if (status === "Occupé") return "occupe";
        return "";
    };

    return (
        <div className={`member-card ${isCurrentUser ? "active-member" : ""} ${viewMode}`}>
            <div className="member-top">
                <div className={`avatar ${getStatusClass(member.status)}`}>
                    {member.name.substring(0, 2).toUpperCase()}
                </div>

                <div>
                    <h3>{member.name}</h3>
                    <p>{isCurrentUser ? "Vous" : "Membre"}</p>
                </div>

                {isCurrentUser && <span className="you-badge">vous</span>}
            </div>

            <span className={`status-badge ${getStatusClass(member.status)}`}>
                <span></span>
                {member.status}
            </span>

            {isCurrentUser && (
                <div className="status-actions">
                    <button onClick={() => onChangeStatus("En ligne")}>En ligne</button>
                    <button onClick={() => onChangeStatus("Absent")}>Absent</button>
                    <button onClick={() => onChangeStatus("Occupé")}>Occupé</button>
                </div>
            )}
        </div>
    );
}

export default MemberCard;