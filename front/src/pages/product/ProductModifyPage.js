import { useParams } from "react-router-dom";
import ProdcutModifyComponent from "../../components/product/ProductModifyComponent";

const ProductModifyPage = () => {
  const { pno } = useParams();

  return (
    <div className="p-4 w-full bg-white">
      <div className="text-3xl font-extrabold">상품 수정하기</div>

      <ProdcutModifyComponent pno={pno} />
    </div>
  );
};

export default ProductModifyPage;