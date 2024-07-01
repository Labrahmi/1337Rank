import { Link } from 'react-router-dom'
import '../App.css'

function Login() {

    let client_id = 'u-s4t2ud-d872ed6904ddf535135836257e87653a534dad2f6b0b41e1ff7ff40597923994';
    let redirect_uri = 'http://10.11.248.228/callback';
    let url = `https://api.intra.42.fr/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code`;

    return (
        <main className='h-screen w-screen flex justify-center items-center'>
            <Link to={url} className='px-4 p-2 border border-[#93B1A6] rounded-lg select-none flex justify-center items-center gap-2 cursor-pointer font-semibold shadow-2xl shadow-current outline-0 hover:outline-2 hover:scale-[1.05] transition-all duration-300 ease-in-out hover:invert hover:brightness-75'>
                <h1 className=''>Login with Intra</h1>
                <img className='w-6 aspect-square' src="/42_logo.png" alt="" />
            </Link>
        </main>
    )
}

export default Login
