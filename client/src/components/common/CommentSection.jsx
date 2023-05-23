// @ts-nocheck
import { formatDistance } from 'date-fns';
import { useEffect, useRef, useState } from 'react';
import { BiSend, BiTrash } from 'react-icons/bi';
import { ImSpinner6 } from 'react-icons/im';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import commentApi from '~/apis/comment.api';
import SectionWrapper from './SectionWrapper';

const CommentItem = ({ comment, onRemove }) => {
  const { user } = useSelector((state) => state.user);

  const [onLoading, setOnLoading] = useState(false); // is handling api

  const getTimeComment = (timestamp) => {
    // timestamp (in mongoose) là dạng ISO date, ví dụ: "2023-05-22T10:58:00.536Z". Dùng new Date(timestamp) để convert sang Date

    // dayjs: dayjs(review.createdAt).format("DD-MM-YYYY HH:mm:ss") -> 17-05-2023 18:54:11
    // JS thuần: new Date(comment.createdAt).toLocaleString(); -> 5/22/2023, 5:58:00 PM
    // date-fns: formatDistance(subDays(new Date(), 3), new Date(), { addSuffix: true }) -> about 9 hours ago
    return formatDistance(new Date(timestamp), new Date(), { addSuffix: true }); // | fromDistanceToNow
  };

  const handleRemoveComment = async () => {
    if (onLoading) return;

    setOnLoading(true);
    const { response, err } = await commentApi.deleteComment({ commentId: comment.id }); // handle api -> update db
    setOnLoading(false);

    if (response) {
      onRemove(comment.id); // handle update local state
      toast.success('Remove comment success');
    }
    if (err) toast.error(err.message);
  };

  return (
    <div className={`flex items-start gap-4 p-4 hover:bg-skin-paper ${onLoading ? 'opacity-50' : 'opacity-100'}`}>
      {/* Text Avatar //TODO: refactor component with arbitrary color */}
      <div className="grid h-10 w-10 select-none place-content-center rounded-full bg-sky-500 text-center text-lg">
        {comment.userId.displayName.charAt(0)}
      </div>

      {/* Content */}
      <div className="relative flex-1 space-y-4">
        {/* user & commentInfo */}
        <div className="flex flex-col gap-2">
          <h4 className="text-xl font-bold">{comment.userId.displayName}</h4>
          {/* FIXME: if has updateCmt api -> .updatedAt */}
          <span className="text-xs">{getTimeComment(comment.createdAt)}</span>
        </div>

        {/* text comment */}
        <p className="text-justify">{comment.content}</p>

        {/* Remove Btn if it's currentUser's comment */}
        {user?.id === comment.userId.id && (
          <button
            className={`relative inline-flex items-center gap-2 rounded px-3 py-1.5 font-semibold text-white md:absolute md:right-0 md:top-0 ${
              onLoading ? 'bg-slate-500' : 'bg-skin-primary'
            }`}
            onClick={handleRemoveComment}
          >
            <span>{onLoading ? <ImSpinner6 size={24} className="animate-spin" /> : <BiTrash size={24} />}</span>
            <span>Remove</span>
          </button>
        )}
      </div>
    </div>
  );
};

function CommentSection({ mediaComments, media, mediaType }) {
  const { user } = useSelector((state) => state.user);

  const [comments, setComments] = useState([]); // list comments sorted by createdAt in Be
  const [filteredComments, setFilteredComments] = useState([]); // limit list (sorted by comments) -> FIXME: sort list cmt by others ...
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [onLoading, setOnLoading] = useState(false);
  const commentsPerPage = 2;

  const commentSectionRef = useRef(); // scrollIntoView to section (when addCmt) due to sorting by newest cmt
  const commentsRef = useRef(); // scroll to start | end when add | load more
  const textFieldRef = useRef('');

  useEffect(() => {
    // required check because it maybe undefined when api isn't done yet
    if (mediaComments) {
      setComments([...mediaComments]);
      setFilteredComments([...mediaComments].splice(0, commentsPerPage)); // or mediaComments.toSplice()
      setCount(mediaComments.length);
    }
  }, [mediaComments]);

  // Scroll to bottom when load more comments -> scroll after update localState
  useEffect(() => {
    if (page > 1) commentsRef.current.scrollTop = commentsRef.current.scrollHeight; // FIXME: smooth by using empty element
  }, [page]);

  const handleLoadMore = () => {
    setPage(page + 1);
    setFilteredComments(comments.slice(0, (page + 1) * commentsPerPage)); // [...filteredComments, ...comments.slice(page * commentsPerPage, commentsPerPage)] or splice/toSplice...
    // scroll to end of list comments -> if handing it here leads to scrolling before loading the last items -> in useEffect [page]
  };

  const handleRemoveLocal = (deletedCmtId) => {
    const newComments = comments.filter((e) => e.id !== deletedCmtId); // return a new array of shadow copy elements
    setComments(newComments);
    setFilteredComments(newComments.slice(0, page * commentsPerPage));
    setCount(count - 1);
  };

  const handleAddComment = async () => {
    if (onLoading) return;
    setOnLoading(true);
    const { response, err } = await commentApi.addComment({
      mediaId: media.id,
      mediaType,
      content: textFieldRef?.current?.value,
      mediaTitle: media.title || media.name,
      mediaPoster: media.poster_path,
    });
    setOnLoading(false);

    if (response) {
      // response from api createComment only include userId for user, add moreInfo in client (here) or update api in server
      const newCustomComment = {
        ...response.data,
        userId: {
          id: user.id,
          displayName: user.displayName,
          username: user.username,
        },
      };
      const newComments = [newCustomComment, ...comments]; // add newComment to first (FIXME: update theo cách sort ban đầu)

      setComments(newComments);
      setFilteredComments(newComments.slice(0, page * commentsPerPage)); // update filtered but still limit comments. Or add first and remove last in filtered: [newCustomComment, ...filteredComment.slice[0, LENGTH - 2]] -> //FIXME: when remove itemsPerPage comments -> page state should decrease. Or now scrollBottom when load more, create scrollBottom btn
      setCount(count + 1);
      toast.success('Post successfully');
    }
    if (err) toast.error(err.message);

    textFieldRef.current.value = ''; // reset textarea
    commentsRef.current.scrollTop = 0; // scrollToTop // FIXME: find way to smooth
    commentSectionRef.current.scrollIntoView({ behavior: 'smooth' }); // Add additional padding-top if it is obscured by the Header Component.
  };

  return (
    <SectionWrapper className="pt-20" title={`Reviews (${count})`} ref={commentSectionRef}>
      {/* List comment: scroll limit height by commentsPerPage //FIXME: handle if list is empty -> show text No Comments */}
      <div className="scrollbar flex max-h-[280px] flex-col gap-8 [overflow-y:overlay]" ref={commentsRef}>
        {filteredComments?.map((comment, index) => (
          <CommentItem key={index} comment={comment} onRemove={handleRemoveLocal} />
        ))}
      </div>
      {/* Load more */}
      {filteredComments.length < comments.length && (
        <div className="text-center">
          <button className="load-more" onClick={handleLoadMore}>
            load more
          </button>
        </div>
      )}
      {/* Add comment if signin */}
      {user && (
        <div className="mx-4 flex gap-4 border-t border-solid border-slate-500 pt-8">
          {/* TextAvatar // FIXME: */}
          <div className="grid h-10 w-10 place-content-center rounded-full bg-sky-500 text-xl">
            {user.displayName.charAt(0)}
          </div>

          {/* Add post */}
          <div className="relative flex-1 space-y-4">
            <h4 className="text-xl font-bold">{user.displayName}</h4>

            <textarea
              className="w-full rounded border border-slate-500 bg-skin-default p-4 hover:outline-white focus:outline-skin-primary [&:where(:hover,:focus)]:outline"
              placeholder="Write your comment here"
              ref={textFieldRef}
              rows={4}
            ></textarea>

            <div className="text-right">
              <button
                className={`inline-flex items-center gap-2 rounded px-4 py-2 text-white hover:opacity-80 ${
                  onLoading ? 'bg-slate-500' : 'bg-skin-primary'
                }`}
                onClick={handleAddComment}
              >
                <span>
                  {onLoading ? (
                    <ImSpinner6 size={24} className="animate-spin" />
                  ) : (
                    <BiSend size={24} className="-rotate-45" />
                  )}
                </span>
                <span className="font-bold uppercase">Post</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </SectionWrapper>
  );
}

export default CommentSection;
