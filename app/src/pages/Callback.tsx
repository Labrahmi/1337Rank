import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import '../App.css'

function Callback() {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const fetchUser = async (code: string) => {
            if (code === 'null') {
                navigate('/login');
                return;
            }
            let endPoint = `${import.meta.env.VITE_PUBLIC_API_URL}/login`;
            console.log(endPoint);
            let response = await fetch(endPoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    query: {
                        code: code
                    }
                })
            });
            response = await response.json();
            if (response.status === 200) {
                if ((response as any).data.access_token === undefined) {
                    navigate('/login');
                    return;
                }
                localStorage.setItem('token', (response as any).data.access_token);
                localStorage.setItem('promo', JSON.stringify((response as any).data.promo));
                navigate(`/${(response as any).data.promo.Campus.name}/${(response as any).data.promo.begin_at}`);
            }
            else {
                navigate('/login');
            }
        }
        const code = new URLSearchParams(location.search).get('code');
        fetchUser(code || 'null');
    }, []);

    return (
        <main className='h-screen w-screen flex justify-center items-center'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 animate-spin">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
        </main>
    )
}

export default Callback
