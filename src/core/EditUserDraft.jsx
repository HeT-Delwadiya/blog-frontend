import React from 'react';
import { useParams } from "react-router";
import Footer from "../components/Footer";
import Header from "../components/Header";
import EditPost from "./components/EditPost";

function EditUserDraft(props) {

       const {draftId} = useParams();

       return (
              <div>
                     <Header/>
                            <EditPost postId={draftId} isPost={false} />
                     <Footer/>
              </div>
       );
}

export default EditUserDraft;