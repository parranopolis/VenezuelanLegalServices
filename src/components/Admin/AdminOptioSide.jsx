import { Link } from "react-router-dom"
export function AdminOptionSide({ onPageChange }) {
    return (
        <>
            <ul>
                <li><Link to='/createaccesscode'>Create Code</Link></li>
            </ul>
            {/* <button onClick={() => onPageChange('CreateAccesCode')}>Create Code</button><br /> */}
        </>
    )
}