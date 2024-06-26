import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import productRouter from "./productRouter";
import memberRouter from "./memberRouter";
import cartRouter from "./cartRouter";
import LoadingSpinner from "./LoadingSpninner";
import communityRouter from "./communityRouter";
import noticeRouter from "./noticeRouter";
import communityReplyRouter from "./communityReplyRouter";
import animalRouter from "./animalRouter";
import qnaRouter from "./qnaRouter";
import missingRouter from "./missingRouter";

const Main = lazy(() => import("../pages/etc/MainPage"));
const Product = lazy(() => import("../pages/product/ProductListPage"));
const Cart = lazy(() => import("../pages/cart/CartPage"));
const Animal = lazy(() => import("../pages/animal/AnimalListPage"));
// const FAQ = lazy(() => import("../pages/FAQ"));
// const InquiryForm = lazy(() => import("../components/InquiryForm"));
// const MonthArtistPage = lazy(() => import("../pages/MonthArtistPage"));
const Community = lazy(() => import("../pages/community/ListCommunityPage"));
const Notice = lazy(() => import("../pages/notice/ListNoticePage"));
const ErrorPage = lazy(() => import("../pages/etc/ErrorPage"));
const MissingPetReport = lazy(() =>
  import("../pages/missing/MissingPetReportPage")
);

const rootRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <Main />
      </Suspense>
    ),
  },
  {
    path: "products",
    // element: (
    //   <Suspense fallback={<LoadingSpinner />}>
    //     <Product />
    //   </Suspense>
    // ),
    children: productRouter(),
  },
  {
    path: "animal",
    // element: (
    //   <Suspense fallback={<LoadingSpinner />}>
    //     <Animal />
    //   </Suspense>
    // ),
    children: animalRouter(),
  },
  {
    path: "missing",
    // element: (
    //   <Suspense fallback={<LoadingSpinner />}>
    //     <MissingPetReport />
    //   </Suspense>
    // ),
    children: missingRouter(),
  },
  {
    path: "member",
    children: memberRouter(),
  },
  {
    path: "cart",
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <Cart />
      </Suspense>
    ),
    children: cartRouter(),
  },
  // {
  //   path: "about",
  //   element: (
  //     <Suspense fallback={<LoadingSpinner />}>
  //       <FAQ />
  //       <InquiryForm />
  //     </Suspense>
  //   ),
  // },
  // {
  //   path: "month",
  //   element: (
  //     <Suspense fallback={<LoadingSpinner />}>
  //       <MonthArtistPage />
  //     </Suspense>
  //   ),
  // },
  {
    path: "community",
    // element: (
    //   <Suspense fallback={<LoadingSpinner />}>
    //     <Community />
    //   </Suspense>
    // ),
    children: communityRouter(),
  },
  {
    path: "communityReply",

    children: communityReplyRouter(),
  },
  {
    path: "notice",

    children: noticeRouter(),
  },

  {
    path: "qna",

    children: qnaRouter(),
  },
  {
    path: "/*",
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <ErrorPage />
      </Suspense>
    ),
  },
]);

export default rootRouter;
