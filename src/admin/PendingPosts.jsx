import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import UserPostCard from "../core/components/UserPostCard";
import { setPageNumber, setPageSize, setPendingPosts, setTotalPages } from "../state/reducers/adminReducers";
import { getPendingPosts, getTotalPendingPostPages } from "./helper/adminapis";
import { Pagination } from '@mui/material';
import ShowLoading from "../components/ShowLoading";
import ShowError from "../components/ShowError";
import { ThemeProvider } from '@mui/material';
import muiTheme from "../components/muiTheme";

function PendingPosts(props) {

       const dispatch = useDispatch();
       const adminData = useSelector(state => state.admin);
       const user = useSelector((state) => state.auth);
       const [isLoading, setIsLoading] = useState(true);
       const [error, setError] = useState(false);

       const loadData = ({pageNumber, pageSize}) => {
              getPendingPosts(user._id, {pageNumber, pageSize}, user.token)
              .then(res => {
                     if(!res.err) {
                            dispatch(setPendingPosts(res));
                     }
                     setIsLoading(false);
              })
              .catch(err => console.log(err) && setError("Something went wrong!") && setIsLoading(false))
       } 

       const loadTotalPages = () => {
              setIsLoading(true); 
              getTotalPendingPostPages(user._id, user.token)
              .then(res => { 
                     if(!res.err) {
                            dispatch(setTotalPages(Math.floor(res/10)===0 || res/10===1 ? 1 : Math.floor(res/10)+1));
                     }
                     setIsLoading(false);
              })
              .catch(err => console.log(err) && setError("Something went wrong!") && setIsLoading(false))
       }

       useEffect(() => { 
              dispatch(setPageNumber(1));
              loadData({pageNumber: 1, pageSize: adminData.pageSize});
              loadTotalPages();
       }, []);

       useEffect(() => {
              loadTotalPages();
              dispatch(setPageNumber(1));
              loadData({pageNumber: 1, pageSize: adminData.pageSize});
       },[adminData.refreshPendingPosts])

       const handlePageChange = (event, page) => {
              event.preventDefault();
              setIsLoading(true);
              dispatch(setPageNumber(page));
              loadData({pageNumber: page, pageSize: adminData.pageSize}); 
              scrollToTop();
       }

       const scrollToTop = () =>{
              window.scrollTo({
                     top: 0, 
                     behavior: 'smooth'
              });
       }


       return (
              <div>
                     {adminData?.pendingPosts?.length<1 && (<h3 className="text-center mt-3">No pending posts found</h3>)}
                     {adminData?.pendingPosts?.map((post) => <UserPostCard key={post._id} isPost={true} post={post} isAdminControl={true} isApprovable={true} />)}
                     {adminData?.totalPages>1 && <ThemeProvider theme={muiTheme}><div className="mt-4"><Pagination count={adminData?.totalPages} color="purple" size="large" onChange={handlePageChange} page={adminData?.pageNumber} /></div></ThemeProvider>}
              </div>
       );
}

export default PendingPosts;