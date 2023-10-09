"use client";

import Link from "next/link";
import StarRatings from "react-star-ratings";

export default function Product({ data }: any) {
  function reviewDisplay(review: string) {
    if (review) {
      if (review.length > 30) {
        return review.substring(0, 30) + "...";
      } else {
        return review;
      }
    }
  }

  console.log(data);
  return (
    <Link className="col-span-1" href={`product/${data.productId}`}>
      <div className="max-w-sm w-full lg:max-w-full lg:flex">
        <div className="w-full shadow-md border border-gray-400 lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
          <div className="mb-8">
            <div className="text-gray-900 font-bold text-xl mb-2">
              {data.name}
            </div>
            <p className="text-gray-700 text-base">
              Product Id: {data.productId}
            </p>
            <p className="text-gray-700 text-base">{data.productModel?.name}</p>
          </div>
          <div className="flex items-center">
            <div className="text-sm">
              <p className="text-gray-900 leading-none">
                {data.productReviews[0]?.reviewerName}
              </p>
              <p className="text-gray-600">
                {reviewDisplay(data.productReviews[0]?.comments)}
              </p>
              <p className="text-sm font-bold text-gray-700">
                <StarRatings
                  rating={data?.productReviews[0]?.rating}
                  starRatedColor="blue"
                  starDimension="10px"
                  starHoverColor="yellow"
                  numberOfStars={5}
                  name="rating"
                />
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="bg-white my-8 p-8 rounded-lg">
        <div className="flex gap-2">
          <h3 className="text-gray-700">Product Name:<p className="font-bold">{data.name}</p></h3>
          <div className="text-gray-700"> {data.productId}</div>
        </div>
        <div className="my-8">
          <p className="break-all">{data.productModel?.name}</p>
        </div>
        <div className="flex gap-4 cursor-pointer items-center">
          <p className="text-sm font-bold text-gray-700">
            List Price: ${data?.listPrice}
          </p>
        </div>
        {data?.productReviews[0]?.rating ? (
          <div className="flex gap-4 cursor-pointer items-center">
            <p className="text-sm font-bold text-gray-700">
              <StarRatings rating={data?.productReviews[0]?.rating} starRatedColor="blue" starDimension="20px" starHoverColor="yellow" numberOfStars={5} name="rating"/>
            </p>
          </div>
        ) : (
          <div className="flex gap-4 cursor-pointer items-center pt-2">
            <p className="text-sm font-bold text-gray-700">
              No Reviews for this product
            </p>
          </div>
        )}
      </div> */}
    </Link>
  );
}
