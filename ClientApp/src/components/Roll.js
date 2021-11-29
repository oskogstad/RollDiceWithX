import RollDetails from "./RollDetails";
import {motion} from "framer-motion";

const Roll = ({ roll }) => {
    const rollMotion = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                duration: 0.4
            }
        },
    }
    
    let date = new Date(roll.utcTimestamp);
    let timestamp = (date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes());
    return <motion.li className="rolls-list-item" variants={rollMotion} size={20}>
        <div>
            <div>{roll.username} rolled a {roll.result.total}</div>
            <RollDetails rolls={roll.result.rolls}/>
            {roll.result.modifier !== 0 && <div><b>Modifier: </b> {roll.result.modifier}</div>}
            <div className="rolls-list-item-timestamp">{timestamp}</div>
        </div>
    </motion.li>
    
    // <motion.div animate={{fontsize: 40}} className="roll-container">
    //     <motion.span animate={{fontSize: 40, color: "#c5e1e6"}} className="username">Username: {roll.username}</motion.span>
    //     <span className="timestamp">, UTC: {roll.utcTimestamp}</span>
    //     <span className="rollresult">, Total: {roll.result.total}</span>
    //     <span className="rollmod">, Modifier: {roll.result.modifier}</span>
    //     {/*<span className="rolddldescription">, Rolls: ${roll.result.rolls})</span>*/}
    // </motion.div>
}

export default Roll;