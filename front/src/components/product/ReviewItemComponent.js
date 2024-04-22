import React, { useState } from "react";
import { replyDel, replyPut } from "../../api/productReplyApi";
import FetchingModal from "../common/FetchingModal";
// import { useSelector } from "react-redux";

const ReviewItemComponent = ({
  prno,
  productReplyer,
  productReplyText,
  regDate,
  reviewRedirect,
  pno,
  star,
}) => {
  const [fetching, setFetching] = useState(false);
  const [modifyMode, setModifyMode] = useState(false);
  const [text, setText] = useState(productReplyText);
  const [score, setScore] = useState(star);

  // 수정버튼 클릭 시 수정 모드로 전환 핸들러
  const modifyClickHandler = () => {
    setModifyMode(true); // 수정 모드로 전환
  };

  // 리뷰내용 수정 반응 핸들러
  const handleChangeText = (e) => {
    setText(e.target.value);
  };

  // 별점 수정 반응 핸들러
  // const handleChangeScore = (e) => {
  //   setScore(e.target.value);
  // };

  // 별점 핸들러
  const scoreHandler = (value) => {
    setScore(value);
  };

  // 리뷰 수정 핸들러
  const reviewModifyHandler = () => {
    const formData = new FormData();

    // formData.append("pno", pno);
    formData.append("productReplyText", text);
    // formData.append("productReplyer", loginState.nickname);
    formData.append("star", score);

    if (!text) {
      window.alert("내용을 입력해주세요.");
      return;
    }

    setFetching(true);

    replyPut(prno, formData)
      .then((data) => {
        reviewRedirect();
      })
      .catch((error) => {
        console.error("리뷰 수정 중 오류 발생:", error);
      })
      .finally(() => {
        setFetching(false);
      });

    window.alert("해당 리뷰가 성공적으로 수정되었습니다.");

    setModifyMode(false); // 읽기 모드로 전환
  };

  // 리뷰 삭제 핸들러
  const reviewDeleteHandler = () => {
    if (window.confirm("해당 리뷰를 정말로 삭제하시겠습니까?") === false) {
      return;
    }

    setFetching(true);

    replyDel(prno)
      .then((data) => {
        reviewRedirect();
      })
      .catch((error) => {
        console.error("리뷰 삭제 중 오류 발생:", error);
      })
      .finally(() => {
        setFetching(false);
      });

    window.alert("해당 리뷰가 성공적으로 삭제되었습니다.");
  };

  return (
    <li
      key={prno}
      className={
        "rounded-lg overflow-hidden shadow-lg transition duration-300 ease-in-out cursor-pointer"
      }
    >
      {fetching ? <FetchingModal /> : <></>}

      <div className="flex text-lg p-4 justify-between items-center">
        {modifyMode ? (
          <div className="w-2/12 text-center p-1">
            <div>
              {[1, 2, 3, 4, 5].map((value) => (
                <span
                  name="star"
                  key={value}
                  // onChange={handleChangeScore}
                  onClick={() => scoreHandler(value)}
                  style={{
                    cursor: "pointer",
                    color: value <= score ? "gold" : "gray",
                  }}
                >
                  &#9733;
                </span>
              ))}
            </div>
          </div>
        ) : (
          <div className="w-2/12 text-center p-1">
            <div>
              {[1, 2, 3, 4, 5].map((value) => (
                <span
                  name="star"
                  key={value}
                  style={{
                    cursor: "pointer",
                    color: value <= star ? "gold" : "gray",
                  }}
                >
                  &#9733;
                </span>
              ))}
            </div>
          </div>
        )}
        {modifyMode ? (
          <textarea
            className="w-4/5 p-2 rounded-r border border-solid border-neutral-300 shadow-md resize-y"
            name="productReplyText"
            rows="4"
            onChange={handleChangeText}
            value={text}
          >
            {text}
          </textarea>
        ) : (
          <div className="w-5/12 text-center p-1">{productReplyText}</div>
        )}
        <div className="w-2/12 text-center p-1">{productReplyer}</div>
        <div className="w-2/12 text-center p-1">{regDate}</div>
        <div className="w-1/12 text-center p-1">
          {modifyMode ? (
            <button
              className="bg-gray-700 hover:bg-gray-900 m-1 p-1 text-base text-white w-12 rounded-lg"
              onClick={reviewModifyHandler}
              disabled={fetching} // 요청 중일 때 버튼 비활성화
            >
              수정완료
            </button>
          ) : (
            <button
              className="bg-gray-700 hover:bg-gray-900 m-1 p-1 text-base text-white w-12 rounded-lg"
              onClick={modifyClickHandler}
              disabled={fetching} // 요청 중일 때 버튼 비활성화
            >
              수정
            </button>
          )}
          <button
            className="bg-gray-700 hover:bg-gray-900 m-1 p-1 text-base text-white w-12 rounded-lg"
            onClick={reviewDeleteHandler}
            disabled={fetching} // 요청 중일 때 버튼 비활성화
          >
            삭제
          </button>
        </div>
      </div>
    </li>
  );
};

export default ReviewItemComponent;
