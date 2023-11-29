import { Crypto } from "../Types"
import { useEffect, useState } from "react"

// function updateOwned(crypto: Crypto, arg1: number): void{

// }

export type AppProps = {
    crypto: Crypto;
    updateOwned:(crypto: Crypto, amount: number) => void;
}

export default function CryptoSummary({ crypto, updateOwned }: AppProps): JSX.Element {
    useEffect(() => {
        console.log(crypto.name, amount, crypto.current_price * amount)
    })

    const [amount, setAmount] = useState<number>(NaN)
    
    return (
        <div>
            <span>{crypto.name + ' $' + crypto.current_price}</span>
            <input type="number" style={{ margin: 10 }} value={amount} onChange={(e)=>{
                setAmount(Number(e.target.value))
                updateOwned(crypto, Number(e.target.value))
                //set the parents state by calling a function
                //parsed in as a prop
                
            }}></input>
            <p>
                {isNaN(amount) ? '$0.00' : '$' +
                (crypto.current_price * amount).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits:2})}</p>
        </div>
    )
}

// function updateOwned(crypto: Crypto, arg1: number) {
//     throw new Error("Function not implemented.");
// }
