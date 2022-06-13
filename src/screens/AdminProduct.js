import styled from "styled-components";
import ProductEditLayout from "../components/admin/product/EditLayout";
import ProductUploadLayout from "../components/admin/product/UploadLayout";

const ContentContainer = styled.div`
  display: flex;
`;

const LeftMenuContainer = styled.div`
  width: 200px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
  background-color: ${(props) => props.theme.primary};
  span {
    font-size: 16px;
    margin: 6px 6px;
    padding: 20px 20px;
    cursor: pointer;
  }
`;

const Content = styled.div`
  width: 1000px;
  height: 500px;
`;

const Upload = styled.div`
  display: block;
`;

const Edit = styled.div`
  display: none;
`;

function AdminProduct() {
  const handleUploadBt = () => {
    const uploadLo = document.getElementById("uploadLo");
    const editLo = document.getElementById("editLo");
    uploadLo.style.display = "block";
    editLo.style.display = "none";
  };

  const handleEditBt = () => {
    const uploadLo = document.getElementById("uploadLo");
    const editLo = document.getElementById("editLo");
    uploadLo.style.display = "none";
    editLo.style.display = "block";
  };

  return (
    <ContentContainer>
      <LeftMenuContainer>
        <span onClick={handleUploadBt}>상품 등록</span>
        <span onClick={handleEditBt}>상품 수정</span>
      </LeftMenuContainer>
      <Content>
        <Upload id="uploadLo">
          <ProductUploadLayout></ProductUploadLayout>
        </Upload>
        <Edit id="editLo">
          <ProductEditLayout></ProductEditLayout>
        </Edit>
      </Content>
    </ContentContainer>
  );
}
export default AdminProduct;
