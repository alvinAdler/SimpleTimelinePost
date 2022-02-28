import { useState } from 'react'

const useSearchState = (initVal) => {
    const [currentState, setCurrentState] = useState(initVal)
    const [hasSearched, setHasSearched] = useState(false)

    return [
        currentState, setCurrentState,
        hasSearched, setHasSearched
    ]
}

export default useSearchState