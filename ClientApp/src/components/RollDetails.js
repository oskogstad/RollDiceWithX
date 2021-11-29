import DiceDetails from './DiceDetails';
const RollDetails = ({rolls}) => {
    var diceTypes = Object.keys(rolls);

    return <div>
        {diceTypes.map((diceType, index) =>
            <DiceDetails key={index} diceType={diceType} diceRolls={rolls[diceType]} />
        )}
    </div>
}

export default RollDetails;