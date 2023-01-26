import React, { useEffect, useState } from 'react';
import UserPostCard from "./UserPostCard";
import { useSelector, useDispatch } from 'react-redux';
import { ThemeProvider } from '@mui/material';
import muiTheme from "../../components/muiTheme";
import { Pagination } from '@mui/material';
import ShowLoading from "../../components/ShowLoading";
import _ from "lodash";

function UserPostsList(props) {

       const dispatch = useDispatch();
       const user = useSelector((state) => state.user);
       const [pageNumber, setPageNumber] = useState(1);
       const [totalPages, setTotalPages] = useState(1);
       const [pageSize, setPageSize] = useState(10);
       const [posts, setPosts] = useState([]);
       const [isLoading, setIsLoading] = useState(false);

       const loadPosts = () => {
              setPageNumber(1);
              setTotalPages(Math.floor(user.posts.length/10)===0 ? 1 : Math.floor(user.posts.length/10)+1);
              setPosts(_.slice(user.posts, 0, pageSize));
       }

       useEffect(() => {
              loadPosts();
       }, [user.posts]);

       const handlePageChange = (event, page) => {
              event.preventDefault();
              setIsLoading(true);
              setPageNumber(page);
              setPosts(_.slice(user.posts, (page*pageSize)-pageSize, page*pageSize));
              setIsLoading(false);
       } 

       return (
              <div>  
                     <ShowLoading isLoading={isLoading} />
                     {posts?.length<1 && <div className="text-center"><h3 className="mt-5">No posts available</h3></div>}
                     {posts?.map((post) => {
                            return <UserPostCard key={post._id} post={post} isPost={true} />
                     })}
                     {totalPages>1 && <ThemeProvider theme={muiTheme}><div className="mt-4"><Pagination count={totalPages} color="purple" size="large" onChange={handlePageChange} page={pageNumber} /></div></ThemeProvider>}
              </div>
       );
}

export default UserPostsList;