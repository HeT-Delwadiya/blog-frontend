import React, { useEffect, useState } from 'react';
import UserPostCard from "./UserPostCard";
import { useSelector, useDispatch } from 'react-redux';
import { ThemeProvider } from '@mui/material';
import muiTheme from "../../components/muiTheme";
import { Pagination } from '@mui/material';
import ShowLoading from "../../components/ShowLoading";
import _ from "lodash";

function UserDraftsList(props) {

       const dispatch = useDispatch();
       const user = useSelector((state) => state.user);
       const [pageNumber, setPageNumber] = useState(1);
       const [totalPages, setTotalPages] = useState(1);
       const [pageSize, setPageSize] = useState(10);
       const [drafts, setDrafts] = useState([]);
       const [isLoading, setIsLoading] = useState(false);

       const loadDrafts = () => {
              setPageNumber(1);
              setTotalPages(Math.floor(user.drafts.length/10)===0 ? 1 : Math.floor(user.drafts.length/10)+1);
              setDrafts(_.slice(user.drafts, 0, pageSize));
       }

       useEffect(() => {
              loadDrafts();
       }, [user.drafts]);

       const handlePageChange = (event, page) => {
              event.preventDefault();
              setIsLoading(true);
              setPageNumber(page);
              setDrafts(_.slice(user.drafts, (page*pageSize)-pageSize, page*pageSize));
              setIsLoading(false);
       } 

       return (
              <div>  
                     <ShowLoading isLoading={isLoading} />
                     {drafts?.length<1 && <div className="text-center"><h3 className="mt-5">No drafts available</h3></div>}
                     {drafts?.map((draft) => {
                            return <UserPostCard key={draft._id} isPost={false} post={draft} />
                     })}
                     {totalPages>1 && <ThemeProvider theme={muiTheme}><div className="mt-4"><Pagination count={totalPages} color="purple" size="large" onChange={handlePageChange} page={pageNumber} /></div></ThemeProvider>}
              </div>
       );
}

export default UserDraftsList;