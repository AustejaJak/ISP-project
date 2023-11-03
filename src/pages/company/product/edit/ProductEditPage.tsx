import CreateProcuctForm from "../../../../components/forms/product/ProcuctForm";
import FormPage from "../../../../components/forms/FormPage";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

const ProductEditPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <FormPage
      closeFunction={() => navigate(-1)}
      headerTitle={t("Product.EditTitle")}
    >
      <CreateProcuctForm />
    </FormPage>
  );
};

export default ProductEditPage;
