import React from 'react';
import { useParams } from "react-router";
import Footer from "../components/Footer";
import Header from "../components/Header";
import EditPost from "./components/EditPost";

function EditUserPost(props) {

       const {userId, postId} = useParams();

       return (
              <div>
                     <Header/>
                            <EditPost postId={postId} isPost={true} />
                     <Footer/>
              </div>
       );
}

export default EditUserPost;