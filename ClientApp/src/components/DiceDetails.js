const DiceDetails = ({diceType, diceRolls}) => {
    return <div>
        <span>
            <b>{diceType}: </b> {diceRolls.join(', ')} 
        </span>
    </div>
}

export default DiceDetails;