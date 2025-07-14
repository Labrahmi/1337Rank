import { useState, useEffect, useRef } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "../App.css";

interface User {
  order: number;
  login: string;
  image?: string;
  lvl: number;
}

const mockUsers: User[] = [
  // {
  //   order: 1,
  //   login: "user_1",
  //   image: "/profile.png",
  //   lvl: 42,
  // },
  // {
  //   order: 2,
  //   login: "user_2",
  //   image: "/profile.png",
  //   lvl: 36,
  // },
  // {
  //   order: 3,
  //   login: "user_3",
  //   image: "/profile.png",
  //   lvl: 28,
  // },
  // {
  //   order: 4,
  //   login: "user_4",
  //   image: "/profile.png",
  //   lvl: 30,
  // },
  // {
  //   order: 5,
  //   login: "user_5",
  //   image: "/profile.png",
  //   lvl: 45,
  // },
  // {
  //   order: 6,
  //   login: "user_6",
  //   image: "/profile.png",
  //   lvl: 50,
  // },
  // {
  //   order: 7,
  //   login: "user_7",
  //   image: "/profile.png",
  //   lvl: 55,
  // },
  // {
  //   order: 8,
  //   login: "user_8",
  //   image: "/profile.png",
  //   lvl: 60,
  // },
  // {
  //   order: 9,
  //   login: "user_9",
  //   image: "/profile.png",
  //   lvl: 65,
  // },
  // {
  //   order: 10,
  //   login: "user_10",
  //   image: "/profile.png",
  //   lvl: 70,
  // },
  // {
  //   order: 11,
  //   login: "user_11",
  //   image: "/profile.png",
  //   lvl: 75,
  // },
  // {
  //   order: 12,
  //   login: "user_12",
  //   image: "/profile.png",
  //   lvl: 80,
  // },
  // {
  //   order: 13,
  //   login: "user_13",
  //   image: "/profile.png",
  //   lvl: 85,
  // },
  // {
  //   order: 14,
  //   login: "user_14",
  //   image: "/profile.png",
  //   lvl: 90,
  // },
]

function Home() {
  const [users, setUsers] = useState([] as User[]);
  const [currentPage, setCurrentPage] = useState(1);
  const [nextPage, setNextPage] = useState(1);
  const [prevPage, setPrevPage] = useState(1);
  const loading = useRef<HTMLDivElement>(null);
  var { campus_name, begin_at } = useParams();
  const [searchParams] = useSearchParams();
  const token: String = localStorage.getItem("token") || "";

  useEffect(() => {
    const page = searchParams.get("page") || "1";
    setCurrentPage(parseInt(page));
    setNextPage(parseInt(page) + 1);
    if (parseInt(page) > 1) {
      setPrevPage(parseInt(page) - 1);
    }
    const fetchUsers = async () => {
      const endPoint: String = `${import.meta.env.VITE_PUBLIC_API_URL}/cursus_users`;
      let date = new Date(begin_at || new Date().toISOString());
      let firstDay = new Date(
        date.getFullYear(),
        date.getMonth(),
        1
      ).toISOString();
      let lastDay = new Date(
        date.getFullYear(),
        date.getMonth() + 1,
        0
      ).toISOString();
      let body = {
        query: {
          firstDay: firstDay,
          lastDay: lastDay,
          page: page,
          token: token,
          currentPage: currentPage,
          campus_name: campus_name,
        },
      };
      try {
        const response = await fetch(`${endPoint}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });
        const data = await response.json();
        // console.log(data.data);
        setUsers(data.data);
      } catch (error) {
        console.log("error in fetchUsers: ", error);
        setUsers([]);
      }
      setTimeout(() => {
        if (loading.current) {
          loading.current.classList.add("hidden");
        }
      }, 10);
    };
    fetchUsers();
  }, []);

  // let compusList = ["Tétouan", "Change URL bla ma t3dbni"];

  let staticPromoList: { [key: string]: string } = {
    "2025-09": "2025-09",
    "2025-08": "2025-08",
    "2025-07": "2025-07",
    "spliter-1": "---",
    "2024-08": "2024-08",
    "2024-07": "2024-07",
    "2024-06": "2024-06",
    "spliter-2": "---",
    "2023-10": "2023-10",
    "2023-09": "2023-09",
    "2023-08": "2023-08",
    "spliter-3": "---",
    "2022-05": "2022-05",
    "2022-03": "2022-03",
  };

  return (
    <>
      <main className="flex flex-col justify-between md:max-w-2xl md:p-0 p-6 m-auto min-h-screen">
        {/*  */}
        <div className="z-10 py-4 bg-black bg-opacity-90 flex md:justify-center justify-between px-4 items-center gap-32 fixed w-full left-0 bottom-0 backdrop-blur-sm">
          <div className="flex justify-center items-center">
            <select
              className="py-2 hidden md:block bg-transparent cursor-pointer outline-none hover:text-white transition-all duration-200 ease-in-out text-center min-w-32 p-2 rounded appearance-none "
              name=""
              id=""
            >
              <option key={"Tétouan"} value={"Tétouan"}>
                {"Tétouan"}
              </option>
              <option disabled key={"URI"} value={"URI"}>
                {"URI"}
              </option>
            </select>
            <select
              onChange={(e) => {
                location.href = `/Tétouan/${e.target.value}`;
              }}
              className="py-2 bg-transparent cursor-pointer outline-none hover:text-white transition-all duration-200 ease-in-out text-center md:min-w-32 rounded appearance-none"
              name=""
              id=""
            >
              <option className="" value="0">
                Promo
              </option>

              {Object.entries(staticPromoList).map(([key, value]) => {
                if (value === "---") {
                  return <option disabled key={key} value={value}>{value}</option>;
                }
                return (
                  <option key={key} value={value}>
                    {value}
                  </option>
                );
              })}
            </select>

          </div>
          <div className="select-none">
            <div className="flex justify-center items-center gap-4">
              <a
                onClick={(e) => {
                  if (prevPage == currentPage) {
                    e.preventDefault();
                  }
                }}
                href={`?page=${prevPage}`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6 hover:text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
                  />
                </svg>
              </a>
              <h1 className="font-semibold">{currentPage}</h1>
              <a
                onClick={(e) => {
                  if (users.length === 0) {
                    e.preventDefault();
                  }
                }}
                href={`?page=${nextPage}`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6 hover:text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="p-4 flex flex-col gap-2 md:pt-32 pt-16 md:text-5xl text-3xl text-left font-thin">
          Tartib dial poolers hh
        </div>
        <div className="flex py-4 border-t border-t-zinc-50/10"></div>
        <div className="md:p-4 flex flex-col text-sm md:text-base md:py-16 gap-3">
          {/* if users is empty */}
          {users.length === 0 && (
            <div className="flex justify-center items-center h-96">
              <div className="flex flex-col gap-4 items-center select-none">
                <h1 className="text-4xl font-thin">No Users</h1>
                <Link
                  to="/"
                  className="text-2xl font-thin hover:underline transition-all duration-200 ease-in-out"
                >
                  Try again later ⎋
                </Link>
              </div>
            </div>
          )}
          {/*  */}
          {users.map((user) => (
            <a
              target="_blank"
              href={`https://profile.intra.42.fr/users/${user.login}`}
              key={user.order}
              className={
                "group flex items-center justify-between font-normal py-2 md:px-6 px-4 hover:text-white border border-zinc-50/10 rounded-lg bg-zinc-500/25 hover:bg-zinc-600 backdrop-blur-xl select-none transition-all duration-200 delay-0 hover:shadow-lg hover:shadow-white/10"
              }
            >
              <div className="flex gap-4 justify-start items-center">
                <h2 className="md:min-w-8 hidden md:block">#{user.order}</h2>
                <img
                  className="w-16 rounded-full aspect-square border transition-all duration-200 delay-0"
                  src={user.image ? user.image : "/cat.png"}
                  alt="profile"
                />
                <h1>{user.login}</h1>
              </div>
              <div>
                <span className="font-light">LVL</span> {user.lvl}
              </div>
            </a>
          ))}
        </div>
        {/*  */}
        <div
          ref={loading}
          id="loading"
          className="flex justify-center items-center fixed h-screen w-screen bg-black bg-opacity-50 backdrop-blur top-0 left-0"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6 animate-spin"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
            />
          </svg>
        </div>
        <footer className="py-8 font-thin"></footer>
      </main>
    </>
  );
}

export default Home;
