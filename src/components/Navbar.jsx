import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';



export default function Navbar() {
    const { user } = useAuth();
    const navigate = useNavigate();

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/"><h1>EChat</h1></a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" onClick={() => navigate('/')}>Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" onClick={() => navigate('/user/' + `${user.uid}`)}>Profile</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
};