import { Link } from "react-router-dom";

export const Navbar = () => {

    return (
        <header>
            <nav className="navbar navbar-expand-md fixed-top bg-dark">
                <div className="container-fluid">
                <Link className="navbar-brand fw-bold" to={"/"}>2048</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" 
                    aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarCollapse">
                    <ul className="navbar-nav me-auto mb-2 mb-md-0">
                        <li className="nav-item">
                            <Link className="nav-link" aria-current="page" to={"/"}>Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" aria-current="page" to={"/mcts"}>MCTS</Link>
                        </li>
                    </ul>
                </div>
                </div>
            </nav>
        </header>
    );
};