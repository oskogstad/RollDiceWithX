
const Roll = ({ roll }) => {
    console.log("Roll got roll", roll);
    return <div className="roll-container">
        <span className="username">Username: {roll.username}</span>
        <span className="timestamp">, UTC: {roll.utcTimestamp}</span>
        <span className="rollresult">, Total: {roll.result.total}</span>
        <span className="rollmod">, Modifier: {roll.result.modifier}</span>
        {/*<span className="rolddldescription">, Rolls: ${roll.result.rolls})</span>*/}
    </div>
}

export default Roll;