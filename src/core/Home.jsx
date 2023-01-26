/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PostCard from "./components/PostCard";
import {getApprovedPosts, getPostsByName, getTotalPages} from "./helper/userapi";
import { Pagination } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { setPageNumber, setPageSize, setPosts, setTotalPages } from '../state/reducers/entitiesReducers';
import ShowLoading from "../components/ShowLoading";
import ShowError from "../components/ShowError";
import { ThemeProvider } from '@mui/material';
import muiTheme from "../components/muiTheme";

function Home(props) {

       const [error, setError] = useState(false);
       const [isLoading, setIsLoading] = useState(true);
       const [search, setSearch] = useState("");
       const [visible, setVisible] = useState(false);
       
       const dispatch = useDispatch();
       const {pageNumber, totalPages, pageSize, posts} = useSelector((state) => state.entities);

       const fetchPosts = () => { 
              setIsLoading(true);
              getTotalPages()
              .then(res => {
                     if(!res.err)
                            dispatch(setTotalPages(res%10!==0 ? Math.floor(res/10)+1 : res/10));
              })
              .catch(err => console.log(err) && setError("Something went wrong!") && setIsLoading(false))
              getPosts({pageNumber, pageSize});
       }

       const getPosts = ({pageNumber, pageSize}) => {
              getApprovedPosts({pageNumber, pageSize})
              .then(res => {
                     dispatch(setPosts(res));
                     setIsLoading(false);
              })
              .catch(err => console.log(err) && setError("Something went wrong!") && setIsLoading(false))
       }

       useEffect(() => {
              fetchPosts();
       }, []);

       const handleChange = (event) => {
              setSearch(event.target.value);
       }

       const handleSearch = (event) => {
              event.preventDefault();
              dispatch(setPageNumber(1));
              setIsLoading(true);
              getPostsByName({postTitle: search, pageNumber: 1, pageSize})
              .then(res => {
                     dispatch(setPosts(res.posts));
                     dispatch(setTotalPages(res.totalPosts%10!==0 ? Math.floor(res.totalPosts/10)+1 : res.totalPosts/10));
                     dispatch(setPageNumber(1));
                     setIsLoading(false);
              })
              .catch(err => console.log(err) && setError("Something went wrong!") && setIsLoading(false))
       }

       const handlePageChange = (event, page) => {
              event.preventDefault();
              setIsLoading(true);
              dispatch(setPageNumber(page));
              getPosts({pageNumber: page, pageSize});
              scrollToTop();
       }

       const toggleVisible = () => {
              const scrolled = document.documentElement.scrollTop;
              if (scrolled > 300){
                     setVisible(true)
              } 
              else if (scrolled <= 300){
                     setVisible(false)
              }
       }

       const scrollToTop = () =>{
              window.scrollTo({
                     top: 0, 
                     behavior: 'smooth'
              });
       }
            
       window.addEventListener('scroll', toggleVisible);

       return (
              <div>
                     <Header />
                     <div className="container my-5">
                            <ShowError error={error} />
                            <ShowLoading isLoading={isLoading} />
                            <form className="d-flex mb-5" role="search">
                                   <input className="form-control me-2 shadow" value={search} onChange={handleChange} type="search" placeholder="Search by post title..." aria-label="Search"/>
                                   <button className="btn btn-outline-dark shadow" onClick={handleSearch} type="submit">Search</button>
                            </form>
                            <div>
                                   {posts?.length>0 ? posts?.map((post) => <PostCard key={post._id} post={post} />) : <h2 className="text-center">No posts found!</h2>}
                            </div>
                            {totalPages>1 && <ThemeProvider theme={muiTheme}><div className="mt-4"><Pagination count={totalPages} color="purple" size="large" onChange={handlePageChange} page={pageNumber} /></div></ThemeProvider>}
                     </div>
                     <div className="text-end">
                            <button onClick={scrollToTop} className="btn theme-bg text-dark rounded-3 text-center position-fixed bottom-0 end-0 mb-5 me-5 shadow-lg border border-dark" style={{fontWeight:"600", display: visible? "":"none"}}><i className="fa-solid fa-angle-up" style={{color: "#fff"}}></i></button>
                     </div>
                     <Footer small={posts?.length>1 ? false : true} />
              </div>
       );
}

export default Home;