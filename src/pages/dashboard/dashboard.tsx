import React from 'react'
import { signOut } from '../../utils/firebase/auth'

export default function Dashboard() {
    return (
        <div>
            <button className="btn btn-warning" onClick={signOut}>Sign Out</button>
        </div>
    )
}
