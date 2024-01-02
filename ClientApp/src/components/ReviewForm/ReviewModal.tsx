import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import {
  CreateReviewFields,
  createReviewDefaultValues,
  createReviewModel,
} from "./model";
import { useMutation } from "@tanstack/react-query";
import { QueryKey } from "../../clients/react-query/queryKeys";
import { reviewsApi } from "../../clients/api/reviewsApi";
import React from "react";
import { BaseTextField } from "../BaseTextField/BaseTextField";
import { useSnackbarContext } from "../../context/snackbarContext";
import { t } from "i18next";
import { BaseModal } from "../Modal/BaseModal";
import { BaseSelect } from "../base-select/BaseSelect";

interface ReviewFormProps {
  productId: string;
  closeModal: () => void;
  open: boolean;
  refetch?: () => void;
}

export const ReviewModal: React.FC<ReviewFormProps> = ({
  productId,
  closeModal,
  open,
  refetch,
}) => {
  const { setMessage } = useSnackbarContext();
  const methods = useForm({
    resolver: zodResolver(createReviewModel),
    defaultValues: createReviewDefaultValues,
  });
  const {
    handleSubmit,
    getValues,
    formState: { errors },
  } = methods;

  const createReview = useMutation({
    mutationKey: [QueryKey.CREATE_REVIEW],
    mutationFn: reviewsApi.createReview,
  });

  const processForm = () => {
    const data = createReviewModel.parse(getValues());
    createReview.mutate(
      { productId: productId, review: data },
      {
        onSuccess: (res) => {
          refetch?.();
          closeModal();
        },
        onError: (err) => {
          console.log(err);
          setMessage(err.message);
        },
      }
    );
  };

  return (
    <BaseModal
      onClose={closeModal}
      width='w-[680px]'
      title={"Atsiliepimo sukūrimas"}
      open={open}
    >
      <div className='p-5'>
        <FormProvider {...methods}>
          <form className='space-y-6' onSubmit={handleSubmit(processForm)}>
            <div className='flex flex-col gap-5'>
              <BaseSelect
                items={[
                  { id: "1", name: "1" },
                  { id: "2", name: "2" },
                  { id: "3", name: "3" },
                  { id: "4", name: "4" },
                  { id: "5", name: "5" },
                ]}
                formField={CreateReviewFields.RATING}
                label={t("ReviewModal.Rating")}
                errorMessage={errors[CreateReviewFields.RATING]?.message}
              />

              <BaseTextField
                formField={CreateReviewFields.COMMENT}
                label={t("ReviewModal.Comment")}
                type='text'
                errorMessage={errors[CreateReviewFields.COMMENT]?.message}
              />
              <BaseTextField
                formField={CreateReviewFields.PICTURE_URL}
                label={t("ReviewModal.PictureUrl")}
                type='text'
                errorMessage={errors[CreateReviewFields.PICTURE_URL]?.message}
              />
            </div>
            <div>
              <button
                type='submit'
                className='flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
              >
                Sukurti
              </button>
            </div>
          </form>
        </FormProvider>
      </div>
    </BaseModal>
  );
};
