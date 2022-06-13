import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";
import { useMediaQuery } from "react-responsive";

import { Link } from "react-router-dom";
import React, { Children, useEffect } from "react";

import "react-toastify/dist/ReactToastify.css";

import AdminLayout from "../components/admin/AdminLayout";

const SEEDETAIL_QUERY = gql`
  query seeDetail($id: Int!) {
    seeDetail(id: $id) {
      id
      productName
      productEngName
      price
      thumbnail
      detailPage1
      detailPage2
      productSliderPictures {
        id
        order
        link
      }
    }
  }
`;

function Admin() {
  return (
    <div>
      <AdminLayout></AdminLayout>
    </div>
  );
}
export default Admin;
