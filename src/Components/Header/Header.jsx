import './Header.scss'

function Header() {
    return (
        <nav className='header'>
            <h1>To do list</h1>
            <div className='nav_links'>
                <a href="">A propos</a>
                <a href="">Contact</a>
            </div>
        </nav>
    )
}

export default Header