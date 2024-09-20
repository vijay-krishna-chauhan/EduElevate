import React, { useEffect, useState } from "react";
import { NavbarLinks } from "../../data/navbar-links";
import { Link, matchPath, useLocation } from "react-router-dom";
import logo from "../../assets/Logo/Eduelevate logo.png";
import { useSelector } from "react-redux";
// import { useLocation } from 'react-router-dom';
import { AiOutlineShoppingCart } from "react-icons/ai";
import ProfileDropDown from "../core/Auth/ProfileDropDown";
import { apiConnector } from "../../services/apiconnector";
import { categories } from "../../services/apis";

// const subLinks = [
//   {
//     title: "python",
//     link: "/catalog/python",
//   },
//   {
//     title: "web dev",
//     link: "/catalog/web-development",
//   },
// ];
const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);

  const location = useLocation();
  const [subLinks, setSubLinks] = useState([]);
  const [loading, setLoading]=useState(false);
  // useEffect(() => {
  //   const fetchCategories = async () => {
  //     setLoading(true);
  //     try {
  //       const res = await apiConnector("GET", categories.CATEGORIES_API);
  //       console.log("API Response:", res); // Log the entire response
  
  //       if (res && res.data && res.data.data) {
  //         setSubLinks(res.data.data);
  //       } else {
  //         console.log("No data found in the response:", res);
  //         setSubLinks([]); // Handle case where data is not as expected
  //       }
  //     } catch (error) {
  //       console.log("Error fetching categories:", error);
  //       setSubLinks([]); // Handle the error by setting subLinks to an empty array
  //     }
  //     setLoading(false);
  //   };
  
  //   fetchCategories();
  // }, []);
  
  useEffect(()=>{
    (async ()=>{
      setLoading(true);
      try{
        const res=await apiConnector("GET", categories.CATEGORIES_API);
        console.log(res.data.data);
        setSubLinks(res.data.data)
      }catch(error){
        console.log("could not fetch the code", error);
      }
      setLoading(false);
    })()
  },[])

  // useEffect(()=>{
  //     async()=>{
  //         try{

  //             const result=await apiConnector("GET", categories.CATEGORIES_API);
  //             console.log("Prinitng sublinks result", result);
  //             setSubLinks(result.data.data);

  //         }
  //         catch(e){
  //             console.log("Could not fetch the category list");
  //         }
  //     }
  // })

  // const fetchSublinks = async () => {
  //   try {
  //     const result = await apiConnector("GET", categories.CATEGORIES_API);
  //     console.log(result);
  //     if (result?.data?.data?.length > 0) {
  //       setSubLinks(result?.data?.data);
  //     }
  //     localStorage.setItem("sublinks", JSON.stringify(result.data.data));
  //   } catch (error) {
  //     // setsublinks(JSON.parse(localStorage.getItem("sublinks")));
  //     // console.log("could not fetch sublinks",localStorage.getItem("sublinks"));
  //     console.log(error);
  //   }
  // };
  // useEffect(() => {
  //   fetchSublinks();
  // }, []);
  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  return (
    <div className="flex h-14 items-center border-b-richblack-700 border-b-[1px] justify-center">
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">
        <Link to="/">
          <img src={logo} width={160} height={42} lazy="true" />
        </Link>

        <nav>
          <ul className="flex gap-x-6 text-richblack-25">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <div className=" flex items-center group relative cursor-pointer">
                    <p>{link.title}</p>
                    <svg
                      width="25px"
                      height="20px"
                      viewBox="0 0 24.00 24.00"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      transform="rotate(0)"
                      stroke="#000000"
                      strokeWidth="0.00024000000000000003"
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        stroke="#CCCCCC"
                        strokeWidth="0.384"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        {" "}
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M4.29289 8.29289C4.68342 7.90237 5.31658 7.90237 5.70711 8.29289L12 14.5858L18.2929 8.29289C18.6834 7.90237 19.3166 7.90237 19.7071 8.29289C20.0976 8.68342 20.0976 9.31658 19.7071 9.70711L12.7071 16.7071C12.3166 17.0976 11.6834 17.0976 11.2929 16.7071L4.29289 9.70711C3.90237 9.31658 3.90237 8.68342 4.29289 8.29289Z"
                          fill="#ffffff"
                        ></path>{" "}
                      </g>
                    </svg>

                    <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
                      <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>

                      {subLinks?.length < 0 ? (
                        <div></div>
                      ) : (
                        subLinks?.map((element, index) => (
                          <Link
                            // to={`/catalog/${element?.name}`}
                            to={`/catalog/${element.name
                              .split(" ")
                              .join("-")
                              .toLowerCase()
                            }`}
                            key={index}
                            className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
                            onClick={() => {
                              //dispatch(setProgress(30));
                            }}
                          >
                            <p className="">{element?.name}</p>
                          </Link>
                        ))
                      )}

                      {/* {
                        loading?(
                          <p className="text-center">Loading...</p>
                        ):
                        subLinks.length ?(
                          <>
                          {subLinks?.filter(
                            (subLink)=>subLink?.courses?.length > 0
                          )?.map((subLink, i)=>(
                            <Link to={`/catalog/${subLink.name
                              .split(" ")
                              .join("-")
                              .toLowerCase()
                            }`}
                            className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
                            key={i}>
                              <p>{subLink.name}</p>
                            </Link>
                          ))}</>
                        ):(
                          <p className="text-center">No course found</p>
                        )
                      } */}

                      
                      {/* //   Array.isArray(subLinks) && subLinks.length > 0 ? (
                      //     subLinks
                      //       .filter((subLink) => subLink?.course?.length > 0)
                      //       .map((subLink, i) => (
                      //         <Link */}
                      {/* //           to={`/catalog/${subLink.name
                      //             .split(" ")
                      //             .join("-")
                      //             .toLowerCase()}`}
                      //           className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
                      //           key={i}
                      //         >
                      //           <p>{subLink.name}</p>
                      //         </Link>
                      //       ))
                      //   ) : (
                      //     <p className="text-center">No courses found</p>
                      //   )
                      // } */}
                       
                    </div>
                  </div>
                ) : (
                  <Link to={link?.path}>
                    <p
                      className={`${
                        matchRoute(link?.path)
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`}
                    >
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
        {/* login signup etc */}
        <div className="flex gap-x-4 items-center">
          {user && user?.accountType != "Instructor" && (
            <Link to="/dashborad/cart" className="relative">
              <AiOutlineShoppingCart />
              {totalItems > 0 && <span>{totalItems}</span>}
            </Link>
          )}
          {/* {token === null && ( */}
            <Link to="/login">
              <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[7px] text-richblack-100 ">
                Log in
              </button>
            </Link>
          {/* )} */}
          
          {/* {token === null && ( */}
            <Link to="/signup">
              <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[7px] text-richblack-100">
                Sign up
              </button>
            </Link>
          {/* )} */}
          {token !== null && (
            <div className="pt-2">
              <ProfileDropDown />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
