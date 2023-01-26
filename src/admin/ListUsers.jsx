import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import UserCard from "./components/UserCard";
import { getAllUsers, getTotalUserPages } from "./helper/adminapis";
import { Pagination } from '@mui/material';
import ShowLoading from "../components/ShowLoading";
import ShowError from "../components/ShowError";
import { ThemeProvider } from '@mui/material';
import muiTheme from "../components/muiTheme";
import {setUsers,setPageNumber,setTotalPages} from "../state/reducers/adminReducers";
import UserDetails from "./components/UserDetails";

function ListUsers(props) {

       const dispatch = useDispatch();
       const adminData = useSelector(state => state.admin);
       const user = useSelector((state) => state.auth);
       const [isLoading, setIsLoading] = useState(true);
       const [error, setError] = useState(false);
       const [displayUser, setDisplayUser] = useState(false);

       const loadData = ({pageNumber, pageSize}) => {
              getAllUsers(user._id, {pageNumber, pageSize}, user.token)
              .then(res => {
                     if(!res.err) {
                            dispatch(setUsers(res));
                     }
                     setIsLoading(false);
              })
              .catch(err => console.log(err) && setError("Something went wrong!") && setIsLoading(false))
       }

       const loadTotalPages = () => {
              setIsLoading(true);
              getTotalUserPages(user._id, user.token)
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
              loadData({pageNumber: adminData?.pageNumber, pageSize: adminData?.pageSize});
              loadTotalPages();
       }, []);

       useEffect(() => {
              dispatch(setPageNumber(1));
              loadData({pageNumber: 1, pageSize: adminData?.pageSize});
              loadTotalPages();
       },[adminData.refreshUsers])

       const handlePageChange = (event, page) => {
              event.preventDefault();
              setIsLoading(true);
              dispatch(setPageNumber(page));
              loadData({pageNumber: page, pageSize: adminData?.pageSize});
       }

       return (
              <div>
                     <ShowError error={error}/>
                     <ShowLoading isLoading={isLoading} />
                     {adminData?.users && (<>{!displayUser && adminData?.users?.map((user) => <UserCard key={user._id} user={user} setDisplayUser={setDisplayUser} />)}
                     {!displayUser && adminData?.totalPages>1 && <ThemeProvider theme={muiTheme}><div className="mt-4"><Pagination count={adminData?.totalPages} color="purple" size="large" onChange={handlePageChange} page={adminData?.pageNumber} /></div></ThemeProvider>}
                     {displayUser && <UserDetails userId={displayUser} setDisplayUser={setDisplayUser} />}</>)}
              </div>
       );
}

export default ListUsers;