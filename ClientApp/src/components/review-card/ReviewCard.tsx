import React from "react";
import { Review } from "../../types/types";
import { StarIcon } from "@heroicons/react/20/solid";

interface ReviewCardProps {
  review: Review;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  const { comment, pictureUrl, rating } = review;
  return (
    <div className='bg-[#ebedf2] p-5 w-[550px] h-44 rounded-lg'>
      <div className='flex gap-5'>
        <img className='h-auto cover w-32' src={pictureUrl} alt={""} />
        <div className='flex flex-col gap-5'>
          <p className='text-md'>
            {comment.length > 80 ? `${comment.substring(0, 80)}...` : comment}
          </p>
          <div className='flex items-center'>
            <StarIcon className='h-5' />
            <span>{`${rating}/5`}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
