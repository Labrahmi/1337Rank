import { useState, useEffect, useRef } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import '../App.css'

interface User {
    order: number;
    login: string;
    image?: string;
    lvl: number;
}

const baseURL: String = "https://api.intra.42.fr";

function Home() {
    const navigate = useNavigate();
    const [users, setUsers] = useState([] as User[]);
    const [currentPage, setCurrentPage] = useState(1);
    const [nextPage, setNextPage] = useState(1);
    const [prevPage, setPrevPage] = useState(1);
    const loading = useRef<HTMLDivElement>(null);
    var { campus_name, begin_at } = useParams();
    const [searchParams] = useSearchParams();
    const token: String = localStorage.getItem('token') || '';
    // ------------------------------------------------------------------------------------------------
    const getCampusId = async (campus_name: String) => {
        const endPoint: String = "/v2/campus?filter[country]=Morocco";
        try {
            const response = await fetch(`${baseURL}${endPoint}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            const campus = data.find((campus: any) => campus.name === campus_name);
            if (campus === undefined) {
                return (55); // Default campus id
            }
            return (campus.id);
        } catch (error) {
            return (55); // Default campus id
        }
    };
    // ------------------------------------------------------------------------------------------------
    useEffect(() => {
        const page = searchParams.get('page') || "1";
        setCurrentPage(parseInt(page));
        setNextPage(parseInt(page) + 1);
        if (parseInt(page) > 1) {
            setPrevPage(parseInt(page) - 1);
        }
        const fetchUsers = async () => {
            const campus_id: Number = await getCampusId(campus_name || 'Tétouan');
            begin_at = begin_at || 'null';

            let date = new Date(begin_at);
            let firstDay = new Date(date.getFullYear(), date.getMonth(), 1).toISOString();
            let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).toISOString();

            const endPoint: String = `/v2/cursus/9/cursus_users?filter[campus_id]=${campus_id}&range[begin_at]=${firstDay},${lastDay}&page=${page}&per_page=100&sort=-level`;
            try {
                const response = await fetch(`${baseURL}${endPoint}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                const data = await response.json();
                var i = currentPage * 100 - 99;
                let tempUsers = data.map((user: any) => {
                    return {
                        id: user.user.id,
                        order: i++,
                        login: user.user.login,
                        image: user.user.image.versions.medium,
                        lvl: user.level.toFixed(2),
                    }
                });
                setUsers(tempUsers);
            } catch (error) {
                setUsers([]);
                navigate('/login');
            }
            setTimeout(() => {
                if (loading.current) {
                    loading.current.classList.add('hidden');
                }
            }, 300);
        };
        fetchUsers();
    }, []);

    return (
        <>
            <main className='flex flex-col justify-between md:max-w-2xl m-auto min-h-screen'>
                {/*  */}
                <div className='z-10 py-4 bg-black bg-opacity-90 flex justify-center items-center gap-32 fixed w-full left-0 bottom-0 backdrop-blur-sm'>
                    {/* ------------------------- */}
                    <div className='flex justify-center items-center'>
                        <select className='py-2 bg-transparent cursor-pointer outline-none hover:text-white transition-all duration-200 ease-in-out text-center min-w-32 p-2 rounded-xl appearance-none ' name="" id="">
                            <option className='' value="Tétouan">Tétouan</option>
                        </select>
                        <select onChange={(e) => {
                            location.href = `/Tétouan/${e.target.value}`;
                        }} className='py-2 bg-transparent cursor-pointer outline-none hover:text-white transition-all duration-200 ease-in-out text-center min-w-32 p-2 rounded-xl appearance-none ' name="" id="">
                            <option className='' value="0">Promo</option>
                            <option className='' value="2024-06">2024-06</option>
                            {/*  */}
                            <option className='' value="2023-10">2023-10</option>
                            <option className='' value="2023-09">2023-09</option>
                            <option className='' value="2023-08">2023-08</option>
                            {/*  */}
                            <option className='' value="2022-05">2022-05</option>
                            <option className='' value="2022-03">2022-03</option>
                        </select>
                    </div>
                    {/* ------------------------- */}
                    <div className='select-none'>
                        <div className='flex justify-center items-center gap-4'>
                            <a onClick={(e) => {
                                if (prevPage == currentPage) {
                                    e.preventDefault();
                                }
                            }} href={`?page=${prevPage}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 hover:text-white">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
                                </svg>
                            </a>
                            <h1 className='font-semibold'>{currentPage}</h1>
                            <a onClick={(e) => {
                                if (users.length === 0) {
                                    e.preventDefault();
                                }
                            }} href={`?page=${nextPage}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 hover:text-white">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                </svg>
                            </a>
                        </div>
                    </div>
                    {/* ------------------------- */}
                </div>
                <div className='p-4 flex flex-col gap-2 md:pt-32 pt-16 md:text-5xl text-xl text-left font-thin'>Tartib dial poolers hh</div>
                <div className='md:p-4 flex flex-col text-sm md:text-base md:py-16'>
                    {/* if users is empty */}
                    {users.length === 0 && (
                        <div className='flex justify-center items-center h-96'>
                            <div className='flex flex-col gap-4 items-center select-none'>
                                <h1 className='text-4xl font-thin'>No Users</h1>
                                <Link to='/' className='text-2xl font-thin hover:underline transition-all duration-500 ease-in-out'>Try again later ⎋</Link>
                            </div>
                        </div>
                    )}
                    {/*  */}
                    {users.map((user) => (
                        <a target='_blank' href={`https://profile.intra.42.fr/users/${user.login}`} key={user.order} className={'group flex items-center justify-between font-thin py-2 md:px-4 px-8 rounded hover:rounded-xl hover:bg-green-600 hover:scale-110 hover:shadow-2xl hover:shadow-green-950 hover:bg-opacity-30 hover:font-normal hover:text-white select-none transition-all duration-500 ease-in-out delay-0'}>
                            <div className='flex gap-4 justify-start items-center'>
                                <h2 className='md:min-w-8 hidden md:block'>#{user.order}</h2>
                                <img className='w-16 rounded-full aspect-square border group-hover:scale-105 transition-all duration-500 ease-in-out delay-0' src={user.image ? user.image : '/cat.png'} alt="profile" />
                                <h1>{user.login}</h1>
                            </div>
                            <div><span className='font-light'>LVL</span> {user.lvl}</div>
                        </a>
                    ))}
                </div>
                {/*  */}
                <div ref={loading} id='loading' className='flex justify-center items-center fixed h-screen w-screen bg-black bg-opacity-50 backdrop-blur top-0 left-0'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 animate-spin">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                    </svg>
                </div>
                <footer className='py-8 font-thin'></footer>
            </main>
        </>
    )
}

export default Home
